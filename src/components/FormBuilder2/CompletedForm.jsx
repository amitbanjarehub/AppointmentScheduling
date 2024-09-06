import React, { useState } from "react";
import FormBuilder from "./FormBuilder";
import GeneratedForm from "./FormRenderer";

const CompletedForm = () => {
  const [savedForm, setSavedForm] = useState(null);

  return (
    <div>
      <FormBuilder setSavedForm={setSavedForm} />
      {savedForm && <GeneratedForm formSchema={savedForm} />}
    </div>
  );
};

export default CompletedForm;
