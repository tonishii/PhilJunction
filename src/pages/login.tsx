import '@/styles/login-styles.css'

export default function Login() {
    return (
        <div className="login-background">
            <div className="login-center">
                <div className="login-header">
                    <div className="login-header-text"> <img className="login-logo" src="src/assets/logo.svg" alt="PhilJunction Logo" /> PhilJunction!</div>
                    <div>Your one-stop transit forum</div>
                </div>
                <form className='login-contents'>
                    <label htmlFor="uname">Username: </label>
                    <input type="text" id="uname" name="uname" />
                    
                </form>
            </div>
        </div>
    );
}