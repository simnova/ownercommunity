import { ServiceTicketsSearchFilter } from './service-tickets-search-filter';

interface SearchFilterConfigDefinition {
  filters: {
    title: string;
    searchbar?: boolean;
    options: {
      name: string;
      count: number;
    }[];
  }[]
}

export const ServiceTicketsSearchFilters: React.FC<any> = (props) => {

  const searchFilterConfig: SearchFilterConfigDefinition = {
    filters: [
      {
       title: 'Case Status',
       options: [
          {
            name: 'Application Creation',
            count: 10,
          },
          {
            name: 'Application Submitted',
            count: 200,
          },
          {
            name: 'Eligibility Review',
            count: 3,
          },
          {
            name: 'QA Ready',
            count: 7,
          },
          {
            name: 'QA Review',
            count: 6,
          },
          {
            name: 'Application Completed',
            count: 6,
          }
       ] 
      },
      {
        title: 'General Eligibility',
        options: [
          {
            name: 'Approved',
            count: 7,
          },
          {
            name: 'Rejected',
            count: 10,
          },
          {
            name: 'Pending',
            count: 8,
          },
          {
            name: 'NA',
            count: 27,
          }
        ]
      },
      {
        title: 'Pathway',
        searchbar: true,
        options: [
          {
            name: 'Pathway 1',
            count: 8,
          },
          {
            name: 'Pathway 2',
            count: 3,
          },
          {
            name: 'Pathway 3',
            count: 8,
          },
          {
            name: 'Pathway 4',
            count: 103,
          },
          {
            name: 'Pathway 5',
            count: 12,
          },
          {
            name: 'Pathway 6',
            count: 9,
          },
          {
            name: 'Pathway 1',
            count: 8,
          },
          {
            name: 'Pathway 2',
            count: 3,
          },
          {
            name: 'Pathway 3',
            count: 8,
          },
          {
            name: 'Pathway 4',
            count: 103,
          },
          {
            name: 'Pathway 5',
            count: 12,
          },
          {
            name: 'Pathway 6',
            count: 9,
          },
          {
            name: 'Unassigned',
            count: 1,
          }
        ]
      }
    ]
  }

  return (
    <>
      {searchFilterConfig.filters.map((filter: any) => {
        return (
          <ServiceTicketsSearchFilter
            title={filter.title}
            options={filter.options}
            searchbar={filter.searchbar ?? false}
          />
        )
      })}
    </>
  )

}