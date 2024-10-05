'use client';

//import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SearchIcon from '@mui/icons-material/Search';
//useRouter and usePathname hooks to update the URL.
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export default function Search({ placeholder }: { placeholder: string }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        //console.log(term);
        //URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters.
        //ex: ?page=1&query=a
        const params = new URLSearchParams(searchParams);

        //Next, set the params string based on the user’s input. If the input is empty, you want to delete it:
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        //params.toString() translates Path input into a URL
        replace(`${pathname}?${params.toString()}`);
        //replace(${pathname}?${params.toString()}) updates the URL with the user's search data.
        // For example, /dashboard/invoices?query=lee if the user searches for "Lee".
        //The URL is updated without reloading the page, 
    }

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    );
}