import Typewriter from "typewriter-effect";

export const Footer = () => {

  return (
    <div className="footer text-center">
      <p className="pt-3">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Powered by Leomar Sartor")
              // .callFunction(() => {
              //   console.log("String typed out!");
              // })
              //.pauseFor(500)
              // .deleteAll()
              // .callFunction(() => {
              //   console.log("All strings were deleted");
              // })
              .start();
              
          }}
          // options={{
          //   strings: ["Desenvolvido por Leomar Vaz Sartor"],
          //   autoStart: true,
          //   loop: true
          // }}
        />
      </p>
    </div>
  );
};

//https://www.npmjs.com/package/typewriter-effect