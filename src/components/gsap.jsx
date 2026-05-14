// import { useRef } from 'react';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';

// // Register the hook as a plugin
// gsap.registerPlugin(useGSAP);

// const GSAP = () => {
//   const container = useRef();

//   // useGSAP handles cleanup automatically
//   useGSAP(() => {
//     gsap.to(".box", { rotation: 360, duration: 2 });
//   }, { scope: container });

//   return (
//     <div ref={container}>
//       <div className="box">Rotate Me!</div>
//     </div>
//   );
// };

// export default GSAP;
