import { useState ,useEffect} from "react";
import axios from "axios";
import "./index.css"
import {useDispatch,useSelector} from 'react-redux'
import { Link ,useNavigate } from 'react-router-dom';
import { fetchGroups } from "./APIslice";
export default function Group(){
    const navigate = useNavigate();
    const [GroupId,setGroupId]=useState();
    const [GroupNom,setGroupNom]=useState();
    let dispatch=useDispatch();
    useEffect(() => {
        dispatch(fetchGroups());
    }, [dispatch]);
    const ajoute=()=>{
        axios.post('http://localhost:4040/groups',{id:GroupId,groupNom:GroupNom})
        setGroupId('');
        setGroupNom('');
    };
    const modifier = (id) => {
        navigate(`/modifier/${id}`);
      };
    
        

      
    const deleteG = (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer cet élément ?')) {
           
            axios.delete(`http://localhost:4040/groups/${id}`)
                .then(() => {
                    alert('Suppression réussie');
                    dispatch(fetchGroups()); 
                })
                .catch((error) => {
                    console.error('Erreur lors de la suppression:', error);
                    alert('Échec de la suppression. Vérifiez le serveur.');
                });
        }
    };
    
    
    let listGroup = useSelector(state => state.groups.data);
    const loading = useSelector(state => state.groups.loading);
    const error = useSelector(state => state.groups.error);

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return(
        <>
        <input type="number" value={GroupId} placeholder="ID"
        onChange={(e)=>setGroupId(e.target.value)}/>
        <input type="text" value={GroupNom}  placeholder="Nom de group"
        onChange={(e)=>setGroupNom(e.target.value)}/>
        <button onClick={ajoute}>Ajouter</button>  
        <h1>Liste des groupes</h1>
        <table>
            <thead>
                <tr><th>ID</th> <th>Nom </th><th>Operation</th><th>Listes</th></tr>
            </thead>
            <tbody>
                {listGroup.map((grp,index)=>
                <tr>
                    <td>{grp.id}</td>
                    <td>{grp.groupNom}</td>
                    <td>
                        <button onClick={() => deleteG(grp.id)}>Delete</button>
                        <button onClick={() => modifier(grp.id)}>Modifier </button>
                    </td>
                    <td>
                        <Link to={"/liste/"+grp.groupNom} style={{ textDecoration: "none" }}>Liste de {grp.groupNom}</Link>
                    </td>
                </tr>
                )}
            </tbody>
        </table>
        
        </>
    )
}