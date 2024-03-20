import "./styles.css";

//Pages
import { PageOne, PageTwo, PageThree, Footer } from "./pages";

function Aplicacao() {

  return (
    <div className="page">

      <PageOne/>

      {/* <PageTwo />

      <PageThree /> */}

      <Footer />
    </div>
  );
}

export default Aplicacao;
