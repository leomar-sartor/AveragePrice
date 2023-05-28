import { useState } from "react";

function AddRemoveInputField() {
  const [inputFields, setInputFields] = useState([
    {
      fullName: ""
    }
  ]);

  const addInputField = () => {
    console.log("Clicou Novo Const");

    setInputFields([...inputFields, { fullName: "" }]);
  };

  const removeInputField = (index) => {
    console.log("Clicou Remove Const => ", index);
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };

  const handleChange = (index, e) => {
    console.log("Event Change");
    const {name, value } = e.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          {inputFields.map((data, index) => {
            const { fullName } = data;

            return (
              <div className="row my-3" key={index}>
                <div className="col">
                  <div className="form-group">
                    <input
                      type="text"
                      onChange={(e) => handleChange(index, e)}
                      value={fullName}
                      name="fullName"
                      className="form-control"
                      placeholder="fullName"
                    />
                  </div>
                  {/* end form-group */}
                </div>
                {/* end col */}

                <div className="col">
                  {inputFields.length !== 1 ? (
                    <button className="btn btn-outline-danger" onClick={() => removeInputField(index)}> Deletar </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              /* end row my-3 */
            );
          })}
        </div>
        {/* end col-8 */}
      </div>
      {/* end row */}

      <div className="row text-center">
        <div className=" col-sm-12">
          <button className="btn btn-outline-success" onClick={addInputField}>
            Novo
          </button>
        </div>
      </div>
      {/* end row */}
    </div>
    /* end container */
  );
}

export default AddRemoveInputField;
