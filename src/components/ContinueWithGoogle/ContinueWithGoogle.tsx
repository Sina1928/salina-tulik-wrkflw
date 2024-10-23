function ContinueWithGoogle() {
  const handleGoogleSignIn = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  return (
    <div>
      <button onClick={handleGoogleSignIn}>ContinueWithGoogle</button>
    </div>
  );
}

export default ContinueWithGoogle;
