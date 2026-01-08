'use client';

import React from 'react';

export interface ParsedBlock {
  type: 'intro' | 'section' | 'image' | 'callout' | 'quote' | 'columns';
  title?: string;
  content?: string | string[];
  src?: string;
  alt?: string;
  caption?: string;
  variant?: 'info' | 'warning' | 'success';
  author?: string;
  columns?: Array<{ title: string; items: string[] }>;
}

interface ArticleRendererProps {
  content: ParsedBlock[];
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
  return (
    <div>
      {content.map((block, index) => {
        switch (block.type) {
          case 'intro':
            return <IntroBlock key={index} title={block.title || ''} content={block.content as string} />;
          case 'section':
            return <SectionBlock key={index} title={block.title || ''} content={block.content as string[]} />;
          case 'image':
            return <ImageBlock key={index} src={block.src || ''} alt={block.alt || ''} caption={block.caption} />;
          case 'callout':
            return <CalloutBlock key={index} variant={block.variant || 'info'} content={block.content as string} />;
          case 'quote':
            return <QuoteBlock key={index} content={block.content as string} author={block.author} />;
          case 'columns':
            return <ColumnsBlock key={index} columns={block.columns || []} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function IntroBlock({ title, content }: { title: string; content: string }) {
  return (
    <div className="mb-16 pb-16 border-b border-noir/10">
      <h2 
        className="uppercase mb-6"
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(16px, 1.67vw, 24px)',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          color: '#1A1A1A',
        }}
      >
        {title}
      </h2>
      <p 
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(16px, 1.39vw, 20px)',
          fontWeight: 300,
          lineHeight: '160%',
          color: '#1A1A1A',
        }}
      >
        {content}
      </p>
    </div>
  );
}

function SectionBlock({ title, content }: { title: string; content: string[] }) {
  return (
    <div className="mb-12">
      <h2 
        className="mb-8 mt-16"
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(24px, 2.5vw, 36px)',
          fontWeight: 700,
          lineHeight: '120%',
          color: '#1A1A1A',
        }}
      >
        {title}{' '}
        <span 
          className="font-light italic"
          style={{ fontFamily: 'var(--font-instrument)' }}
        >
          (yeah)
        </span>
      </h2>
      {content.map((paragraph, idx) => (
        <p 
          key={idx}
          className="mb-8"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(16px, 1.39vw, 20px)',
            fontWeight: 300,
            lineHeight: '160%',
            color: '#1A1A1A',
          }}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function ImageBlock({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-12">
      <div className="overflow-hidden rounded-lg">
        <img 
          src={src} 
          alt={alt}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption 
          className="mt-4 text-center"
          style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: 'clamp(14px, 1.18vw, 17px)',
            fontStyle: 'italic',
            color: '#1A1A1A',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function CalloutBlock({ variant, content }: { variant: 'info' | 'warning' | 'success'; content: string }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-orange-50 border-orange-200',
    success: 'bg-green-50 border-green-200',
  };

  return (
    <div className={`my-8 p-6 rounded-lg border-2 ${styles[variant]}`}>
      <p 
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(16px, 1.39vw, 20px)',
          fontWeight: 400,
          lineHeight: '160%',
          color: '#1A1A1A',
        }}
      >
        {content}
      </p>
    </div>
  );
}

function QuoteBlock({ content, author }: { content: string; author?: string }) {
  return (
    <blockquote className="my-12 pl-8 border-l-4 border-orange">
      <p 
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(18px, 1.67vw, 24px)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: '160%',
          color: '#1A1A1A',
        }}
      >
        {content}
      </p>
      {author && (
        <cite 
          className="block mt-4 not-italic"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(14px, 1.18vw, 17px)',
            fontWeight: 600,
            color: '#E94601',
          }}
        >
          — {author}
        </cite>
      )}
    </blockquote>
  );
}

function ColumnsBlock({ columns }: { columns: Array<{ title: string; items: string[] }> }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 my-12">
      {columns.map((column, idx) => (
        <div key={idx}>
          <h3 
            className="mb-4"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(18px, 1.67vw, 24px)',
              fontWeight: 700,
              color: '#1A1A1A',
            }}
          >
            {column.title}
          </h3>
          <ul className="space-y-3 pl-6">
            {column.items.map((item, itemIdx) => (
              <li 
                key={itemIdx}
                className="relative"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(16px, 1.39vw, 20px)',
                  fontWeight: 300,
                  lineHeight: '160%',
                  color: '#1A1A1A',
                  paddingLeft: '1.5rem',
                }}
              >
                <span className="absolute left-0 text-orange">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}