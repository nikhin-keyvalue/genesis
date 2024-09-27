import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import Input from '../../components/input/input';
import './styles.css'; 

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-[70%] h-[70%] justify-between items-center text-[14px]">
      <div className="text-white">
        <div className="class-display text-[168px] text-left font-medium">
          Mars<span className="poppins text-[#DE5327]">.</span>
        </div>
        <div className="poppins text-[32px] text-left font-light">
          Your AI Co-pilot<br />for competitive exams
        </div>
      </div>
      <div className="custom-border p-[40px_80px] text-white h-[675px] w-[719px] flex flex-col justify-around">
        <div className="poppins text-[48px] pb-8 font-medium">Login</div>
        <div className="flex-col-gap-4">
          <Input placeholder="Phone number" />
          <Button className='button-primary' onClick={()=> navigate('/onboarding')}>
            <div>Continue</div>
            <img src="arrow-right.png" className="ml-1" />
          </Button>
        </div>
        <div className="text-or">OR</div>
        <div className="flex-col-gap-4">
          <button className="button-secondary">
            <img src="google.png" />
            <div className="poppins text-[20px]">Sign in with Google</div>
          </button>
          <button className="button-secondary">
            <img src="facebook.png" className="h-[32px] w-[32px]" />
            <div className="poppins text-[20px]">Sign in with Facebook</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
