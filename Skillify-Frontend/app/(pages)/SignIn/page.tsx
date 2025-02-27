const SignInPage = () => {
  const sayHiWorld = () => {
    console.log("Hi World");
  };

  return (
    <div>
      <button onClick={sayHiWorld}>Click me</button>
    </div>
  );
};

export default SignInPage;
