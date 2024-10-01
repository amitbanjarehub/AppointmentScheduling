import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubmitResponse from "./Pages/CalenderScheduling/SubmitResponse";
import Layout from "./Pages/Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Categories from "./components/Categories";
import Sidebar from "./components/Sidebar";
import Dashboard1 from "./components/Dashboard";
import EventType from "./Pages/Events/EventType";
import EventCalender from "./components/EventScheduleCalender/EventCalender";
import MCQExam from "./Pages/test/Test";
import CreateEvent from "./Pages/Events/CreateEvent/CreateEvent";
import FormBuilder from "./components/FormBuilder/FormBuilder";
import CompletedForm from "./components/FormBuilder2/CompletedForm";
import RenderForm from "./components/FormBuilder2/RenderForm ";
import FormBuilderComponent from "./components/FormBuilder/FormBuilderComponent";
import RenderFormComponent from "./components/FormBuilder/FormRenderComponent";
import MergeFormBuildingRenderComponent from "./components/FormBuilder/MergeFormBuildingRenderComponent";
import MergeFormBuildingRenderComponent1 from "./components/FormBulider-RenderComponent/MergeFormBuildingRenderComponent";
import CustomFormBuilder from "./Pages/CustomFormBulider/CustomFormBuilder";
import CustomFormBuilderOriginal from "./components/FormBulider-RenderComponent/TestingFormBuilding/CustomFormBuilder";
import CustomMergeformRender from "./components/FormBulider-RenderComponent/TestingFormBuilding/MergeformRender";
import CalenderIntegation from "./Pages/CalenderScheduling/CalenderIntegation";
import MainCalenderIntegration from "./Pages/CalenderScheduling/MainCalenderIntegration";

const MainApp = () => {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flexGrow: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calender" element={<Layout />} />
            <Route path="/submit-response" element={<SubmitResponse />} />
          </Routes>

          <Routes>
            <Route path="/dashboard1" element={<Dashboard1 />} />
            <Route
              path="/calender-integration"
              element={<CalenderIntegation />}
            />
            <Route path="/event-type" element={<EventType />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/orders" element={<Categories />} />
            <Route path="/customers" element={<Categories />} />
            <Route path="/settings" element={<Categories />} />
            <Route path="/event-calender" element={<EventCalender />} />
            <Route path="/exam" element={<MCQExam />} />
            <Route path="/create-event/:eventType" element={<CreateEvent />} />
            <Route path="/form-builder" element={<FormBuilder />} />
            <Route path="/completed-form" element={<CompletedForm />} />
            <Route path="/render-form" element={<RenderForm />} />
            <Route
              path="/main-calender-integration"
              element={<MainCalenderIntegration />}
            />
            <Route
              path="/form-building-component"
              element={<FormBuilderComponent />}
            />
            FormRenderComponent
            <Route
              path="/render-form-component"
              element={<RenderFormComponent />}
            />
            <Route
              path="/merge-build-render"
              element={<MergeFormBuildingRenderComponent />}
            />
            <Route
              path="/form-build-render"
              element={<MergeFormBuildingRenderComponent1 />}
            />
            <Route
              path="/custom-form-builder"
              element={<CustomFormBuilder />}
            />
            {/* this is correct form builder code */}
            {/* <Route
              path="/custom-form-builder-original"
              element={<CustomFormBuilderOriginal />}
            /> */}
            <Route
              path="/custom-formbuilder"
              element={<CustomMergeformRender />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default MainApp;
