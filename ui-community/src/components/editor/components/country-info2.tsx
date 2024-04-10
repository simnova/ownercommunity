import { gql, useQuery } from '@apollo/client';
import { useEditor, useNode } from "@craftjs/core";
import { Input, theme } from 'antd';


interface CountryInfo2Prop {
  country: string;
}

const GET_COUNTRY_DETAILS = gql`
  query CountryDetails($country: ID!) {
      country(code: $country) {
        name
        native
        capital
        emoji
        currency
        languages {
          code
          name
        }
      }
    }
`;

const CountryInfo2: any = ({country, ...props} : CountryInfo2Prop ) => {
  const {
    token: { colorTextBase, colorBgContainer }
  }=theme.useToken();
  const { connectors: { connect, drag } } = useNode((state) =>(
    {
    selected: state.events.selected
  }));

  
  const { loading, data, error } = useQuery(
    GET_COUNTRY_DETAILS,
    { variables: { country: country}, context: { clientName: 'country' } }
  );

  useEditor((state) => ({
    enabled: state.options.enabled
  }));

  if (loading) return <>Loading...</>;

  if (error) return <>Error! ${error.message}</>;

  return (
    <div 
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))} 
      {...props}
      >
      { data?.country && (
        <div className=" shadow overflow-hidden sm:rounded-lg" style={{
          backgroundColor: colorBgContainer,
        }}>
          <div className=" px-4 py-5 border-b border-gray-200" style={{
            backgroundColor: colorBgContainer,
          }}>
            <div className="text-sm" style={{
              color: colorTextBase,
            }}>Details for Country:</div>
            <div className="text-lg  col-psan-2" style={{
              color: colorTextBase,
            }}>{data.country.name}</div>
          </div>
          <div className="grid grid-cols-3 px-4 py-2" style={{
            backgroundColor: colorBgContainer,
          }}>
            <div className="text-sm " style={{
              color: colorTextBase,
            }}>Capital</div>
            <div className="text-sm col-psan-2" style={{
              color: colorTextBase,
            }} >{data.country.capital}</div>
          </div>
          <div className="grid grid-cols-3 bg-white px-4 py-2" style={{
            backgroundColor: colorBgContainer,
          }}>
            <div className="text-sm "  style={{
              color: colorTextBase,
            }}>Emoji</div>
            <div className="text-sm col-psan-2"  style={{
              color: colorTextBase,
            }}>{data.country.emoji}</div>
          </div>
          <div className="grid grid-cols-3  px-4 py-2" 
          style={{
            backgroundColor: colorBgContainer,
          }}
          >
            <div className="text-sm "  style={{
              color: colorTextBase,
            }}>Currency</div>
            <div className="text-sm col-psan-2"  style={{
              color: colorTextBase,
            }}>{data.country.currency}</div>
          </div>
          <div className="grid grid-cols-3  px-4 py-2" style={{
            backgroundColor: colorBgContainer,
          }} >
            <div className="text-sm "  style={{
              color: colorTextBase,
            }}>Languages</div>
            <div className="text-sm col-psan-2"  style={{
              color: colorTextBase,
            }}>{data.country.languages.map((l:any) => l.name).join(', ')}</div>
          </div>
        </div>
      )}


    </div>
  )
}

const CountryInfo2Settings = () => {
  const { actions: { setProp }, country } = useNode((node) => ({
    country: node.data.props.country
  }));
  return (
    <div>
      <Input placeholder="Country Code" value={country} onChange={(inputElement) => setProp((props:any) => props.country = inputElement.target.value)}  />
    </div>
  )
}

CountryInfo2.craft = {
  props: {
    country: 'US'
  },
  related: {
    settings: CountryInfo2Settings
  }

}

export {
  CountryInfo2
};

