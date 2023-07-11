import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginWithGoogle } from "../../features/axios/api/user/userAuthentication";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/redux/slices/user/userSlice";


function GoogleAuthComponent(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const errorMessage = (): void => {
      console.log("error from google login");
    };
  
    const handleSignInWithGoogle = async(credential: string) => {
    //   googleLogin(credential)
    await loginWithGoogle(credential)
        .then((data: any) => {
            console.log(data)
            localStorage.setItem("userToken", data?.token);
        dispatch(setUser(data?.user))
          toast.success(data?.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          // setTimeout(() => {
          //   navigate("/");
          // }, 1000);
           navigate("/");
        })
        .catch((error:any) => {
          toast.error(error.data?.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    };
  
    return (
      <div className='mb-5 '>
        <div className="flex justify-center">
        <GoogleLogin
          width="352px"
          size='large'
          // theme="filled_blue"
          logo_alignment="center"
          shape="pill"
          auto_select={false}
          type="standard"
          ux_mode="popup"
            onSuccess={(response) => {
              if (response) {
                console.log(response)
                handleSignInWithGoogle(response.credential ?? "empty response");
              }
            }}
            onError={errorMessage}
          />
        </div>
      </div>
    );
  }
  
  export default GoogleAuthComponent;