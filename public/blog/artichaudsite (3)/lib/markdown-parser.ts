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
  
  export function parseMarkdown(markdown: string): ParsedBlock[] {
    const blocks: ParsedBlock[] = [];
    const sections = markdown.split(/---(\w+)---/g).filter(s => s.trim());
  
    for (let i = 0; i < sections.length; i += 2) {
      const type = sections[i]?.trim();
      const content = sections[i + 1]?.trim();
  
      if (!type || !content) continue;
  
      switch (type) {
        case 'intro': {
          const lines = content.split('\n').filter(l => l.trim());
          blocks.push({
            type: 'intro',
            title: lines[0],
            content: lines.slice(1).join('\n\n'),
          });
          break;
        }
  
        case 'section': {
          const lines = content.split('\n').filter(l => l.trim());
          const titleLine = lines.find(l => l.startsWith('##'));
          const title = titleLine?.replace('##', '').trim() || '';
          const paragraphs = content
            .replace(/##[^\n]+\n/, '')
            .split('\n\n')
            .filter(p => p.trim());
          
          blocks.push({
            type: 'section',
            title,
            content: paragraphs,
          });
          break;
        }
  
        case 'image': {
          const lines = content.split('\n');
          const src = lines.find(l => l.startsWith('src:'))?.replace('src:', '').trim();
          const alt = lines.find(l => l.startsWith('alt:'))?.replace('alt:', '').trim();
          const caption = lines.find(l => l.startsWith('caption:'))?.replace('caption:', '').trim();
          
          blocks.push({
            type: 'image',
            src: src || '',
            alt: alt || '',
            caption,
          });
          break;
        }
  
        case 'callout': {
          const lines = content.split('\n').filter(l => l.trim());
          const typeLine = lines.find(l => l.startsWith('type:'));
          const variant = typeLine?.replace('type:', '').trim() as 'info' | 'warning' | 'success';
          const text = lines.filter(l => !l.startsWith('type:')).join(' ');
          
          blocks.push({
            type: 'callout',
            variant: variant || 'info',
            content: text,
          });
          break;
        }
  
        case 'quote': {
          const lines = content.split('\n').filter(l => l.trim());
          const authorLine = lines.find(l => l.startsWith('author:'));
          const author = authorLine?.replace('author:', '').trim();
          const text = lines.filter(l => !l.startsWith('author:')).join(' ');
          
          blocks.push({
            type: 'quote',
            content: text,
            author,
          });
          break;
        }
  
        case 'columns': {
          const columnSections = content.split('###').filter(s => s.trim());
          const columns = columnSections.map(section => {
            const lines = section.split('\n').filter(l => l.trim());
            const title = lines[0]?.trim() || '';
            const items = lines.slice(1).map(l => l.replace(/^-\s*/, '').trim()).filter(l => l);
            return { title, items };
          });
          
          blocks.push({
            type: 'columns',
            columns,
          });
          break;
        }
      }
    }
  
    return blocks;
  }