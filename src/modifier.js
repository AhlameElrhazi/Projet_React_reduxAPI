import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchGroups } from "./APIslice";

export default function Modifier() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [GroupId, setGroupId] = useState("");
    const [groupNom, setGroupNom] = useState("");

    
    useEffect(() => {
        axios.get(`http://localhost:4040/groups/${id}`)
            .then((response) => {
                setGroupId(response.data.id);
                setGroupNom(response.data.groupNom);
                
                
            })
            .catch((error) => console.error("Erreur lors de la récupération:", error));
    }, [id]);


    const updateGroup = () => {
        axios.put(`http://localhost:4040/groups/${id}`, {id, groupNom })
            .then(() => {
                alert("Votre modification a été réalisée avec succès.");
                dispatch(fetchGroups()); 
                navigate("/");
            })
            .catch((error) => {
                console.error("Erreur lors de la modification:", error);
            });
            
    };

    return (
        <div>
             <h2>Modifier le Groupe</h2>
            <input type="text" value={GroupId} placeholder="ID" onChange={(e) =>setGroupId(e.target.value)} />
            <input type="text" value={groupNom} placeholder="Nom de groupe" onChange={(e) => setGroupNom(e.target.value)} />
            <button onClick={updateGroup}>Enregistrer</button>
            <button onClick={() => navigate("/")}>Annuler</button>
        </div>
    );
}
