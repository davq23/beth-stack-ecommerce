import * as elements from 'typed-html';

interface SearchResultsProps {
    results: {name: string, href: string}[]
}

export const SearchResults = ({results}: SearchResultsProps) => {
    return <div class="dropdown-menu show" role="menu"> {
        results.length > 0 ? results.map(
            ({name, href}) => <a class="dropdown-item" href={href}>{name}</a>
        ) : <div class="dropdown-item">No results found</div>
    }
    </div>
};