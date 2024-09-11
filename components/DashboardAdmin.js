"use client";
import NewPost from './NewPost';
import Link from '@mui/material/Link';

export default function DashboardAdmin(props) {

    const { tags, categories } = props;

    //"ADMIN"
    return (
        <>
            <Link href="/posts">List Posts</Link>
            <NewPost tags={tags} categories={categories} />
        </>


    );
}

