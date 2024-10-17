'use client';

//import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
//useRouter and usePathname hooks to update the URL.
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

/* MUI */
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchIcon from '@mui/icons-material/Search';

export default function Search({ placeholder }: { placeholder: string }) {

    const searchParams = useSearchParams();//lets you read the current URL's query string.
    const pathname = usePathname(); //lets you read the current URL's pathname.
    //const pathname = '/posts'
    const { replace } = useRouter();

    console.log('searchg', searchParams, 'pathname', pathname)

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

        <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
            <OutlinedInput


                size="small"
                id="search"

                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
                sx={{ flexGrow: 1 }}
                startAdornment={
                    <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                        <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'search',
                }}
            />

        </FormControl>

    );
}


{/*
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
    */}