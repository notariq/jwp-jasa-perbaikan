import Landing from '@/components/home/Landing'
import LayananSection from '@/components/home/ServiceSection'
import About from '@/components/home/About'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function Home() {
  return (
    <>
      <Header />
      <main className='flex flex-col gap-y-12'>
        <div className='px-4'><Landing /></div>
        <div className='px-12'><LayananSection /></div>
        <div className='px-12'><About /></div>
      </main>
      <Footer />
    </>
  )
}

export default Home