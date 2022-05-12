import { angleToRadians } from "../../utils/angle";
import {PerspectiveCamera,OrbitControls, Environment} from '@react-three/drei';
import { useFrame } from '@react-three/fiber'
import { useEffect,useRef} from "react";
import * as THREE from "three";

export default function Three() {

    const orbitControlsRef = useRef(null);
    useFrame((state) => {
        if(!!orbitControlsRef.current){
            const { y } = state.mouse;
            /*orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(30));*/
            /*orbitControlsRef.current.setPolarAngle((y+0.75) * angleToRadians(55));*/

            orbitControlsRef.current.update();
        }

    });

    useEffect(()=>{
        if(!!orbitControlsRef.current){
            console.log(orbitControlsRef.current);
        }
    },[orbitControlsRef.current]);


    return(
        <>  
            {/*camera*/}
            <PerspectiveCamera makeDefault position={[0,1,5]}/>
            <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(30)} maxPolarAngle={angleToRadians(85)} minDistance={5} maxDistance={50}/>




            {/* Ball */}
            <mesh position={[-0.5,0.75,0] } castShadow receiveShadow>
                <sphereGeometry args={[0.75,32,32]}/>
                <meshStandardMaterial color="#737275" metalness={0.3} roughness={0.7}/>
            </mesh>

            {/* cube? */}
            <mesh position={[0.9,0.7,-0.75] } castShadow receiveShadow>
                <boxGeometry args={[1.2,1.2,1.2]}/>
                <meshStandardMaterial color="#a4a2a6" metalness={0.3} roughness={0.5}/>
            </mesh>

            {/* dodecahedron? */}
            <mesh rotation={[0,0,(angleToRadians(60))]} position={[0.9,1,1.3] } castShadow receiveShadow>
                <dodecahedronGeometry args={[1.1]}/>
                <meshStandardMaterial color="#3f3e40" metalness={0.7} roughness={0.1}/>
            </mesh>

            {/* cone */}
            <mesh position={[-0.5,0.9,-1.5] } castShadow receiveShadow>
                <coneGeometry args={[1,3,50]}/>
                <meshStandardMaterial color="#cccacf" metalness={0.2} roughness={0.7}/>
            </mesh>
            

            {/* cylinder */}
            <mesh position={[-1.3,0.5,1.3]} rotation={[0,(angleToRadians(-45)),(angleToRadians(90))]} castShadow receiveShadow>
                <cylinderGeometry args={[0.5,0.5,3,50]}/>
                <meshStandardMaterial color="#e0dee3" metalness={0.7} roughness={0.2} />
            </mesh>


            {/* floor */}
            <mesh rotation={[-(angleToRadians(90)),0,0]} receiveShadow>
                <planeGeometry args={[50,50]}/>
                <meshStandardMaterial color="#de9bdb"/>

            </mesh>
        
            {/* ambient light */}
            <ambientLight args={["#ffffff",0.25]}/>


            {/* Spot light */}
            <spotLight args={["#ffffff",1.5,7,angleToRadians(45),0.5]} position={[-6,1,0]} castShadow />

            <spotLight args={["#ffffff",2,7,angleToRadians(45),0.5]} position={[6,1,0]} castShadow rotation={[0,angleToRadians(90),0]} />



            {/* Environment */}
            <Environment background>
                <mesh>
                    <sphereGeometry args={[20,100,100]}/>
                    <meshBasicMaterial color="#d167bd" side={THREE.BackSide} />
                </mesh>  
            </Environment>


        </>
        )
}