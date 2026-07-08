import { lazy, Suspense } from 'react';
import HeroVideo from '../components/HeroVideo';

const About = lazy(() => import('../components/About'));
const DivisiSection = lazy(() => import('../components/DivisiSection'));
const ProjectSection = lazy(() => import('../components/ProjectSection'));
const Berita = lazy(() => import('../components/Berita'));
const Tag = lazy(() => import('../components/Tag'));
const Tautan = lazy(() => import('../components/Tautan'));
const Footer = lazy(() => import('../components/Footer'));
const ChatWidget = lazy(() => import('../components/ChatWidget'));
const CustomCursor = lazy(() => import('../components/CustomCursor'));

function SectionFallback() {
  return <div style={{ height: '200px' }} />;
}

export default function Home() {
  return (
    <>
      <Suspense fallback={null}><CustomCursor /></Suspense>
      <main>
        <HeroVideo />
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><DivisiSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><ProjectSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><Berita /></Suspense>
        <Suspense fallback={<SectionFallback />}><Tag /></Suspense>
        <Suspense fallback={<SectionFallback />}><Tautan /></Suspense>
        <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
        <Suspense fallback={null}><ChatWidget /></Suspense>
      </main>
    </>
  );
}
