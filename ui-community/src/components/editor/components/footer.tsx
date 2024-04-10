import { useNode, useEditor } from "@craftjs/core";
import { Form, Input, Button, theme } from "antd";

interface FooterProp {
  socialLinks:{
    name: string;
    url: string;
  }[],
  legalLinks: {
    name: string;
    url: string;
  }[],
  copyright: string;

}

const Footer: any = ({ socialLinks, legalLinks, copyright, ...props } : FooterProp) => {
  const {
    token: { colorTextBase }
  }=theme.useToken();
  const { connectors: {connect, drag} } = useNode((state) =>(
    {
      selected: state.events.selected,
    }
  ));

  useEditor((state) => ({
    enabled: state.options.enabled
  }));

  return (
    <footer 
      className="px-4 py-2 "
      ref={ref => connect(drag(ref as HTMLDivElement))} 
      {...props}
      >
      <div className="flex justify-between items-center ">
        <div className="flex items-center">
          {socialLinks.map((socialLink, index) => (
            <a
              key={index}
              href={socialLink.url}
              style={{
                color: colorTextBase,
              }}
              className="ml-4 "
            >
              {socialLink.name}
            </a>  
          ))}
        </div>
        <div className="flex items-center"  style={{
                color: colorTextBase,
              }}>
          {legalLinks.map((legalLink, index) => (
            <a
              key={index}
              href={legalLink.url}
              style={{
                color: colorTextBase,
              }}
              className="ml-4  "
            >
              {legalLink.name}
            </a>
          ))}
        </div>
      </div>
      <div className="text-sm ml-4 mt-4 text-center"  style={{
                color: colorTextBase,
              }}>{copyright}</div>
    </footer>
  );

}

const FooterSettings = () => {
  const [form] = Form.useForm();
  const { actions: { setProp }, componentProps } = useNode((node) => ({
    componentProps: node.data.props
  }));
  const handleReset = () => {
    form.resetFields();
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={componentProps}
      onFinish={(values) => {
        setProp((props:any) =>  {
          Object.assign(props, values);
          console.log(props);
          //return newProps
        });
      }}
    >
      <Form.Item
        name="copyright"
        label="Copyright"
      >
        <Input placeholder='Name' maxLength={500} />
      </Form.Item>
      {componentProps.socialLinks.map((_socialLink:any, index:number) => (
        <div key={index}>
          <Form.Item
          name={["socialLinks", index, "name"]}
          label="Name"
        >
          <Input placeholder='Name' maxLength={500} />
        </Form.Item>
        <Form.Item
          name={["socialLinks", index, "url"]}
          label="Url"
        >
          <Input placeholder='Url' maxLength={500} />
        </Form.Item>
        </div>
      ))}
      <button onClick={() => {
          componentProps.socialLinks.push({
            name: "",
            url: ""
          }) 
        }}
        >Add Another Social Link</button>

      {componentProps.legalLinks.map((_legalLink:any, index:number) => (
        <div key={index}>
          <Form.Item
          name={["legalLinks", index, "name"]}
          label="Name"
        >
          <Input placeholder='Name' maxLength={500} />
        </Form.Item>
        <Form.Item
          name={["legalLinks", index, "url"]}
          label="Url"
        >
          <Input placeholder='Url' maxLength={500} />
        </Form.Item>
        </div>
      ))}
      <button onClick={() => {
          componentProps.legalLinks.push({
            name: "",
            url: ""
          })
        }
        }
        >Add Another Legal Link</button>
      <br/>
      <Form.Item>

      <Button type="primary" htmlType="submit">Apply Changes</Button>
      <Button onClick={() => handleReset()}>Reset</Button>

      </Form.Item>
    </Form>

  );
}

Footer.craft = {
  name: "Footer",
  description: "Footer",
  category: "Layout",
  defaultProps: {
    socialLinks: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/"
      },
      {
        name: "Twitter",
        url: "https://www.twitter.com/"
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/"
      }
    ],
    legalLinks: [
      {
        name: "Privacy Policy",
        url: "https://www.privacypolicy.com/"
      },
      {
        name: "Terms of Use",
        url: "https://www.terms.com/"
      }
    ],
    copyright: "Copyright © 2020"
  },
  related:{
    settings: FooterSettings
  }
}

export {
  Footer
}