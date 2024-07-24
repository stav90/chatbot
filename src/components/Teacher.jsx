import { useGLTF, useAnimations } from "@react-three/drei"
import { useEffect } from "react"
import { teachers, useAITeacher } from "@/hooks/useAITeacher";
import { useFrame } from "@react-three/fiber";
import { randInt } from "three/src/math/MathUtils";
import { MathUtils, MeshStandardMaterial } from "three";
// export const teachers = ["Nanami", "Naoki"]

export const Teacher = ({ teacher, ...props }) => {
    const {scene, animations} = useGLTF(`/models/som-chat-shapes.glb`)
    const { actions } = useAnimations(animations, scene)
    const currentMessage = useAITeacher((state) => state.currentMessage);

    useFrame(({ camera }) => {
        // Smile
        // lerpMorphTarget("mouthSmile", 0.2, 0.5);
        // // Blinking
        // lerpMorphTarget("eye_close", blink ? 1 : 0, 0.5);
    
        // Talking
        for (let i = 0; i <= 21; i++) {
          lerpMorphTarget(i, 0, 0.1); // reset morph targets
        }
    
        if (
          currentMessage &&
          currentMessage.visemes &&
          currentMessage.audioPlayer
        ) {
          for (let i = currentMessage.visemes.length - 1; i >= 0; i--) {
            const viseme = currentMessage.visemes[i];
            if (currentMessage.audioPlayer.currentTime * 1000 >= viseme[0]) {
              lerpMorphTarget(viseme[1], 1, 0.15);
              break;
            }
          }
        //   if (
        //     actions[animation].time >
        //     actions[animation].getClip().duration - ANIMATION_FADE_TIME
        //   ) {
        //     setAnimation((animation) =>
        //       animation === "Talking" ? "Talking2" : "Talking"
        //     ); // Could load more type of animations and randomization here
        //   }
        }
      });

      const lerpMorphTarget = (target, value, speed = 0.1) => {
        scene.traverse((child) => {
          if (child.isSkinnedMesh && child.morphTargetDictionary) {
            const index = child.morphTargetDictionary[target];
            if (
              index === undefined ||
              child.morphTargetInfluences[index] === undefined
            ) {
              return;
            }
            child.morphTargetInfluences[index] = MathUtils.lerp(
              child.morphTargetInfluences[index],
              value,
              speed
            );
          }
        });
      };
    //play idle animation

//     const { nodes, materials, animations } = useGLTF(url)
// const { ref, mixer, names, actions, clips } = useAnimations(animations)
useEffect(() => {
  actions?.idle.play()
})

    return (
       <group {...props}>
        <primitive  object={scene} />
       </group>
        
    )
}

useGLTF.preload(`/models/som-chat-shapes.glb`)
