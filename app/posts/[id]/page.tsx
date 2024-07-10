import React,{ useCallback, useMemo, useRef, useState } from "react";
import prisma from '../../../lib/prisma';

import { ClientPage } from './clientPage';




/*
const getServerDataForClient = async () => {
  console.log('That was executed on the server side')

  const serverData = await new Promise(resolve => {
    setTimeout(() => resolve({ someData: 'secret' }), 3000)
  })

  return serverData
}

*/

async function getData() {
  const res = await fetch('/api/post',
    {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',  
      //'API-Key': process.env.DATA_API_KEY!,
      },
 
             
  }
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return <main></main>
}

 /*

  //e.preventDefault();

  try { 
  const res =  await fetch('/api/post', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({id: id})  //String(e?.id)
  })
  

  if (!res.ok) {
    console.log('Failed to fetch data')
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 

const reponse = res.json()
console.log('reponse',reponse)

//setContent(reponse)


var json = JSON.stringify({ reponse});
console.log('json',json);

var obj = JSON.parse(json);
console.log('obj',obj.content);

return reponse

} catch (error) {
console.error(error);
}

 }
 

/*


const Page = async () => {
  console.log('That also was executed on the server side')
  const serverData = await getServerDataForClient()

  return <ClientPage serverData={serverData} />

}
*/
/*

export default function Home() {

  

  return (
   
     <div>
       
    </div>
    
)
}

*/








//import Layout, { siteTitle } from '../layout.js';
//import Layout, { siteTitle } from '../../layout.js';
/** 

import { getAllPostIds, getPostData } from '../../../lib/posts.js'
import Markdown from 'markdown-to-jsx';


//* Material Ui */

//* Components *//
/** 
import Header from '../../../components/Header.js';
import Footer from '../../../components/Footer.js';
import { sections }  from '../../../components/sectionsList.js' ;


export default async function Post({ params }) {

  const postData = await getPostData(params.id); 
  const paths = getAllPostIds();

  return (

   
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    
   
  );
}
/*
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}*/

/*


est devenu const allPostsData = await getSortedPostsData();

///
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}*/