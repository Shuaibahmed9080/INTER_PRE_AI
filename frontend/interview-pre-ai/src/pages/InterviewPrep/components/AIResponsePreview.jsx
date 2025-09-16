import React from 'react'
// import { LuCopy, LuCheck, LuCode } from "react-icons/lu"
import { Copy, Check, Code } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SystaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIResponsePreview = ({ content }) => {
    if(!content) return null;

  return (
   <div className='w-full max-w-3xl mx-auto'>
    <div className='prose prose-sm sm:prose lg:prose-lg mx-auto'>
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                p({ children }){
                    return <p className='mb-4 text-gray-800'>{children}</p>
                },
                strong({ children }){
                    return <strong className='font-semibold text-gray-900'>{children}</strong>
                },
                em({ children }){
                    return <em className='italic text-gray-700'>{children}</em> 
                },
                ul({ children }){
                    return <ul className='list-disc ml-6 mb-4'>{children}</ul>
                },
                ol({ children }){
                    return <ol className='list-decimal ml-6 mb-4'>{children}</ol>
                },
                li({ children }){
                    return <li className='mb-2'>{children}</li>
                },
                blockquote({ children }){
                    return <blockquote className='border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4'>{children}</blockquote>;
                },
                h1({ children }){
                    return <h1 className='text-4xl font-bold mb-4'>{children}</h1>;
                },
                h2({ children }){
                    return <h2 className='text-3xl font-bold mb-4'>{children}</h2>;
                },
                h3({ children }){
                    return <h3 className='text-2xl font-semibold mb-3'>{children}</h3>;
                },
                h4({ children }){
                    return <h4 className='text-xl font-semibold mb-2'>{children}</h4>;
                },
                h5({ children }){
                    return <h5 className='text-lg font-semibold mb-2'>{children}</h5>;
                },
                a({ children, href }){
                    return <a className='text-blue-600 underline hover:text-blue-800' href={href}>{children}</a>;
                },
                table({ children }){
                    return (
                        <div className='overflow-x-auto my-4'>
                            <table className='table-auto border-collapse border border-gray-300 w-full'>
                                {children}
                            </table>
                        </div>
                    );
                },
                thread({ children }){
                    return <thead className='bg-gray-100'>{children}</thead>;
                },
                tbody({ children }){
                    return <tbody className=''>{children}</tbody>;
                },
                tr({ children }){
                    return <tr className='border-b border-gray-200'>{children}</tr>;
                },
                th({ children }){
                    return <th className='px-4 py-2 text-left font-semibold text-gray-900'>{children}</th>;
                },
                td({ children }){
                    return <td className='px-4 py-2 text-gray-800'>{children}</td>;
                },
                hr(){
                    return <hr className='border-t border-gray-300 my-6' />;
                },
                img({ src, alt }) {
                    return <img className='max-w-full rounded-md my-4' src={src} alt={alt} />;
                },
            }}
        >
            {content}
        </ReactMarkdown>
    </div>
</div>

  )
}

export default AIResponsePreview
