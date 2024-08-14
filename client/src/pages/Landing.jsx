import { Link, Navigate } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { useAppContext } from '../context/appContext';

const Landing = () => {
  const { user } = useAppContext();
  return (
    <>
      {user && <Navigate to='/' />}
      <Wrapper>
        <main>
          <nav>
            <Logo />
          </nav>
          <div className='container page'>
            <div className='info'>
              <h1>
                job <span>tracking</span> app.
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                commodi sint? Dolor, saepe! Mollitia omnis consequuntur fugiat
                commodi nobis, incidunt porro facere quidem ipsa officia!
              </p>
              <Link to='/register' className='btn btn-hero'>
                Login/Register
              </Link>
            </div>
            <img src={main} alt='job hunt' className='img main-img' />
          </div>
        </main>
      </Wrapper>
    </>
  );
};

export default Landing;
