"use client";
import React,{ useCallback, useMemo, useRef, useState } from "react";
import prisma from '../../../lib/prisma';



export default async function Post({params }) {

  try { 
  const res = await fetch('/api/post', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', },
    body:  String(params?.id) 
  })
  

  if (!res.ok) {
    console.log('Failed to fetch data')
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 

const reponse = await res.json()
console.log('reponse',reponse)




var json = JSON.stringify({ reponse});
console.log('json',json);

var obj = JSON.parse(json);
console.log('obj',obj.content);



} catch (error) {
console.error(error);
}


 

  return (
   
     <div>
      </div>
    
)
}










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