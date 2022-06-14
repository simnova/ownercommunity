import { useParams } from "react-router-dom";

export const ListingCard: React.FC<any> = (props) => {

  const params = useParams();
  // const imageGallery = props.images.map((image: any) => {
  //     return image;
  // })
  console.log(props.data);

  return (
    <div className="p-2">
      <div
        className="max-w-xs grid grid-cols-1"
        style={{ border: '1px solid gray', borderRadius: '9px' }}
      >
        <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0">
          <h2 className="mt-1 text-lg font-semibold text-white dark:sm:text-white">
            ${props.data.price}
          </h2>
          {/* <h1 className="mt-1 text-lg font-semibold text-white dark:sm:text-white">Name</h1>
                    <p className="text-sm leading-4 font-medium text-white dark:sm:text-slate-400">Entire house</p> */}
        </div>

        <div className="grid gap-4 col-start-1 col-end-3 row-start-1">
          <img src={"https://ownercommunity.blob.core.windows.net/" + props.data.communityId + "/" + props.data.images[0]} className="w-full h-60 object-cover rounded-lg col-span-2 h-52" />
        </div>

        <div className="px-2">
          <p className="mt-4 mb-0 text-sm leading-6 col-start-1 dark:text-slate-400">
            {props.data.bedrooms} Bds, {props.data.bathrooms} Ba,{' '}
            {props.data.squareFeet} sqft
          </p>
          <p className="mb-0 text-sm leading-6 col-start-1 dark:text-slate-400">
            <em> {props.data.address.freeformAddress}</em>
          </p>
          <p className="text-xs leading-6 col-start-1 dark:text-slate-400">
            <em> A {props.data.type} in {props.data.address.localName}</em>
          </p>
          <p className="mt-4 text-xs leading-6 col-start-1 dark:text-slate-400">{props.data.listingAgentCompany}</p>
        </div>
      </div>
    </div>
  );
};
