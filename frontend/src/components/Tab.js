import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { useState } from "react";
import Bmi from "./Bmi";

export default function Tab({data}) {
  const [activeTab, setActiveTab] = useState("bmi");
  
 

  return (
    <Tabs id="custom-animation" value={activeTab} className="bg-black">
      <TabsHeader>
        {data.map(({  label, value }) => (
          <Tab
            key={value}
            value={value}
            className={
              activeTab === value
                ? "bg-custom-head text-white rounded-2xl"
                : "bg-custom-gym text-black rounded-xl "
            }
            activeTabClassName="custom-active-tab" 
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
