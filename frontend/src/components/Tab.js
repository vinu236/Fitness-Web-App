import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { useState } from "react";
import Bmi from "./Bmi";

export default function Tab() {
  const [activeTab, setActiveTab] = useState("html");
  
  const data = [
    {
      label: "BMI Calculator",
      value: "html",
      desc: (
      <Bmi/>
      ),
    },
    {
      label: "Plans",
      value: "react",
      desc: (
        <div className="h-[300px]">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32. The standard chunk of Lorem Ipsum used since the
          1500s is reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by Englis
        </div>
      ),
    },

    {
      label: "Goals",
      value: "vue",
      desc: <div className="h-[300px] "></div>,
    },
  ];

  return (
    <Tabs id="custom-animation" value={activeTab} className="bg-black">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            className={
              activeTab === value
                ? "bg-custom-head text-white rounded-2xl"
                : "bg-custom-gym text-black rounded-xl "
            }
            onClick={() => setActiveTab(value)}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="bg-[#0f172a]">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
