import { Element, Frame, SerializedNodes, useEditor } from '@craftjs/core';
import { useState } from 'react';
import { Container } from '../components/container';
import { arePageLayoutsLoaded, usePageLayouts } from '../page-layout';
import { Button, Empty, TreeSelect, notification, theme } from 'antd';


// icons
import {
  DesktopOutlined,
  MobileOutlined
} from '@ant-design/icons';
import { PropertiesListing } from '../components/properties-listing';
import { PropertyDetails } from '../components/property-details';
import { TextThing } from '../components/text-thing';


export const EditorDetail = () => {
  const [pageLayouts, setPageLayouts] = usePageLayouts();
  const {
    token: {
      colorTextBase
    }
  }=theme.useToken()
  const [selectedPage, setSelectedPage] = useState<string|undefined>();
  const [selectedPageIsListing, setSelectedPageIsListing] = useState<boolean>(false);
  const [selectedPageIsDetails, setSelectedPageIsDetails] = useState<boolean>(false);
  const [editorJson, setEditorJson] = useState<string | SerializedNodes | undefined>(undefined);
 // const [json, setJson] = useState<string>("");
  const [mobileView, setMobileView] = useState(false);
  const { query } = useEditor();

  if(!arePageLayoutsLoaded(pageLayouts)) {
    return(<div>Loading...</div>);
  }

  const save = () => {
    console.log("save editor detail");
    const json = query.serialize();
    pageLayouts.find((item: any) => item.id === selectedPage)!.layout = json;
    setPageLayouts(pageLayouts);
    notification.success({
      message: "Saved",
      description: "Saved Successfully"
    });
  }

  const formatAntTreeData = (data: any) => {  
    if (!data) return undefined;
    return data?.map((item: any) => ({
        title: item.title,
        value: item.id,
        id: item.id,
        pId: item.parent ? item.parent : undefined })
    );
  } 

  console.log(pageLayouts)
    return(
    <div style={{display:"flex",flex:'1', flexDirection:'column', alignItems:'stretch'}}>
      <div style={{overflow:'scroll'}}>
        <TreeSelect 
          style={{ width: '200px' }}
          treeData={formatAntTreeData(pageLayouts)}
          treeDataSimpleMode={true}
          onChange={(value: any) => {
            console.log(value);
            const node = pageLayouts.find((item: any) => item.id === value);
            let pageLayout = undefined;
            
            let parsedJson = "";

            if (node?.layout) {
              pageLayout =  JSON.parse(JSON.stringify(pageLayouts.find((item: any) => item.id === value)?.layout)) ?? undefined;
              // console.log(pageLayout);
              parsedJson = JSON.stringify(pageLayout);
            }
            
            setSelectedPageIsListing(node?.pageType === 'Listing');
            setSelectedPageIsDetails(node?.pageType === 'Details');
            // console.log(pageLayout);
            console.log(parsedJson);
            setSelectedPage(value);
            console.log(selectedPage)
            setEditorJson(pageLayout);
        //    setJson(parsedJson);
          }}
        />
        <Button size="small" onClick={() => save()}>Save</Button>
        <MobileOutlined onClick={() => setMobileView(true)} style={{fontSize: '20px', color:colorTextBase, border: mobileView?`${colorTextBase} solid 3px`:'none', padding:'5px'}} /><DesktopOutlined onClick={() => setMobileView(false)} style={{fontSize: '20px', color:colorTextBase, border: !mobileView?`${colorTextBase} solid 3px`:'none', padding:'5px'}} />
        <Button size='small' onClick={() => setMobileView(!mobileView)}>Toggle Mobile View</Button>
      </div>
      <div style={{display:'flex',flexGrow:1, height:0}}>
                   
        {
          selectedPage ?
          <div className="bg-slate-500 items-center flex flex-col" style={{flex:'1, auto', overflow:'auto', border:'1px solid lightgray'}}> 
            <div key={selectedPage.toString()} style={{display:'flex', flexDirection:'column'}} className={"grow overflow-y-auto transition-[max-width] transition-[min-width] ease-in-out duration-150 " + (mobileView ? " max-w-[375px] max-h-[667px] min-w-[375px] " : "max-w-[100%] max-h-[100%] min-w-[100%]")}>
              {editorJson !== undefined  ? 
                <Frame data={editorJson} >
                  <Element is={Container} canvas>
                  </Element>
                </Frame>
                : selectedPageIsListing ?
                <Frame data={editorJson} >
                  <Element is={Container} canvas>
                    <PropertiesListing />
                  </Element>
                </Frame>
                : selectedPageIsDetails ?
                <Frame data={editorJson} >
                  <Element is={Container} canvas>
                    <PropertyDetails />
                  </Element>
                </Frame>
                :
                <div>
                  <div>No JSON</div>
                  <Frame data={editorJson} >
                    <Element is={Container} canvas>
                      <TextThing title="Add Components" body="to this page" fontSize={14} />
                    </Element>
                  </Frame>
                </div>
              }     
            </div>
          </div>
        : 
        <div className="bg-slate-500 items-center flex flex-col" style={{flex:1, alignItems:'stretch'}}>  
          <div style={{backgroundColor:'#f7f7f7',display:'flex',alignItems:'center', flex:'1'}}>
            <Empty 
              style={{minWidth:'100%'}}
              description={
                <span>
                Select a Page above to edit
                </span>
              }>
            </Empty>
          </div>
        </div>
        }
      </div>
    </div>
    );
  
}
