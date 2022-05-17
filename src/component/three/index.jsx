import { angleToRadians } from "../../utils/angle";
import {PerspectiveCamera,OrbitControls, Environment, ContactShadows} from '@react-three/drei';
import { useFrame } from '@react-three/fiber'
import { useEffect,useRef} from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Float } from "@react-three/drei"
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


    //Animation
    const ballRef = useRef(null);
    useEffect(()=> {
        if (!!ballRef.current){
            console.log(ballRef.current);


            //timeline
            const timeline = gsap.timeline({ paused:true })

            //x-axis motion
            timeline.to(ballRef.current.position,{
                x: 2,
                duration: 2,
                ease: "power2",
               
            })

            //y-axis motion
            timeline.to(ballRef.current.position,{
                y:0.75,
                duration: 0.75,
                ease: "bounce.out",
               
            },"<")

            //Play
            timeline.play()
            
        }
    },[ballRef.current]);


    return(
        <>  
            {/*camera*/}
            <PerspectiveCamera makeDefault position={[2,6,12]}/>
            <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(30)} maxPolarAngle={angleToRadians(85)} minDistance={5} maxDistance={50}/>




            {/* Ball */}
            <mesh position={[-2.5,2.75,0] } castShadow receiveShadow ref={ballRef}>
                <sphereGeometry args={[0.75,32,32]}/>
                <meshStandardMaterial color="#737275" metalness={0.5} roughness={0.3}/>
            </mesh>

            {/* cube?*/} 
            <Float speed={1.4} rotationIntensity={1.5} floatIntensity={2.3}>
            <mesh position={[0.9,1.5,-2] } castShadow receiveShadow>
                <boxGeometry args={[1.2,1.2,1.2]}/>
                <meshStandardMaterial color="#a4a2a6" metalness={0.3} roughness={0.5}/>
                <Float speed={1.4} rotationIntensity={1.5} floatIntensity={2.3}/>
            </mesh>
            </Float>
            


            {/* floor */}
            <mesh rotation={[-(angleToRadians(90)),0,0]} receiveShadow>
                <planeGeometry args={[50,50]}/>
                <meshStandardMaterial color="#de9bdb"/>

            </mesh>
        
            {/* ambient light */}
            <ambientLight args={["#ffffff",0.25]}/>


            {/* Spot light */}
            

            <spotLight args={["#ffffff",2,8,angleToRadians(45),0.75]} position={[0,5,0]} castShadow />

            



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






/* mnotes
{/* cube? 
<mesh position={[0.9,0.7,-0.75] } castShadow receiveShadow>
<boxGeometry args={[1.2,1.2,1.2]}/>
<meshStandardMaterial color="#a4a2a6" metalness={0.3} roughness={0.5}/>
</mesh>

{/* dodecahedron? 
<mesh rotation={[0,0,(angleToRadians(60))]} position={[0.9,1,1.3] } castShadow receiveShadow>
<dodecahedronGeometry args={[1.1]}/>
<meshStandardMaterial color="#3f3e40" metalness={0.7} roughness={0.1}/>
</mesh>

{/* cone 
<mesh position={[-0.5,0.9,-1.5] } castShadow receiveShadow>
<coneGeometry args={[1,3,50]}/>
<meshStandardMaterial color="#cccacf" metalness={0.2} roughness={0.7}/>
</mesh>


{/* cylinder 
<mesh position={[-1.3,0.5,1.3]} rotation={[0,(angleToRadians(-45)),(angleToRadians(90))]} castShadow receiveShadow>
<cylinderGeometry args={[0.5,0.5,3,50]}/>
<meshStandardMaterial color="#e0dee3" metalness={0.7} roughness={0.2} />
</mesh>
*/