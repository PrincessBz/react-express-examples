import "./petList.css";
import { useEffect, useState } from "react";

export function PetList() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetch("/api/pets")
            .then((response) => response.json())
            .then((pets) => {
                setPets(pets);
            })
            .catch((error) => {
                console.error("Error fetching pets:", error);
            });
    }, []);


    return (
        <>
            <h1>Adoptable Pets</h1>
            <ul>
                {pets.map((pet, i) => (
                    <li key={i}>{pet.name} ({pet.type}, {pet.age} years old)</li>
                ))}
            </ul>
        </>
    );
}
