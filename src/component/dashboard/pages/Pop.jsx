// import React, { useState } from "react";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// // import { Avatar } from "@/components/lib/avatar/Avatar";
// import Update from "./Update";
// export default function Pop() {
//   const [visible, setVisible] = useState(false);

//   // const headerElement = (
//   //   <div className="inline-flex align-items-center justify-content-center gap-2">
//   //     <Avatar
//   //       image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
//   //       shape="circle"
//   //     />
//   //     <span className="font-bold white-space-nowrap">Amy Elsner</span>
//   //   </div>
//   // );

//   const footerContent = (
//     <div>
//       <Button
//         label="Ok"
//         icon="pi pi-check"
//         onClick={() => setVisible(false)}
//         autoFocus
//       />
//     </div>
//   );

//   return (
//     <div className="card flex justify-content-center">
//       <Button
//         label="Show"
//         icon="pi pi-external-link"
//         onClick={() => setVisible(true)}
//       />
//       <Dialog
//         visible={visible}
//         modal
//         // header={headerElement}
//         footer={footerContent}
//         style={{ width: "50rem" }}
//         onHide={() => {
//           if (!visible) return;
//           setVisible(false);
//         }}
//       >
//         <p className="m-0">
//           <Update />
//         </p>
//       </Dialog>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Update from "./Update";

export default function Pop({ selectedTask, onClose, onUpdate }) {
  const [visible, setVisible] = useState(true); // Dialog is open initially

  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-times" onClick={onClose} className="p-button-text" />
      <Button
        label="Save"
        icon="pi pi-check"
        onClick={() => {
          onUpdate(); // Trigger the update callback
          setVisible(false); // Close the dialog
        }}
        autoFocus
      />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      modal
      footer={footerContent}
      style={{ width: "50rem" }}
      onHide={onClose}
    >
      <p className="m-0">
        {/* Pass the selected task data to Update */}
        <Update task={selectedTask} onClose={onClose} />
      </p>
    </Dialog>
  );
}
