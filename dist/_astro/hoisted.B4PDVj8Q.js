const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/pdfParser.DStAEUP2.js","_astro/ToolLayout.astro_astro_type_script_index_0_lang.bFhXMfK2.js"])))=>i.map(i=>d[i]);
import{_ as v}from"./ToolLayout.astro_astro_type_script_index_0_lang.bFhXMfK2.js";import"./hoisted.LcTbNQRp.js";const b=[{id:"professional",name:"Professional Standard",description:"Classic professional cover letter suitable for most industries",tone:"professional",template:`Dear {{hiring_manager}},

I am writing to express my strong interest in the {{job_title}} position at {{company_name}}. With {{years_experience}} years of experience in {{industry}}, I am confident in my ability to make a meaningful contribution to your team.

{{experience_paragraph}}

{{skills_paragraph}}

{{closing_paragraph}}

I am excited about the opportunity to bring my skills and experience to {{company_name}} and would welcome the chance to discuss how I can contribute to your team's success.

Thank you for your time and consideration. I look forward to hearing from you.

Sincerely,
{{full_name}}`},{id:"technical",name:"Technical/Engineering",description:"Focused on technical skills and project achievements",tone:"technical",template:`Dear {{hiring_manager}},

I'm excited to apply for the {{job_title}} role at {{company_name}}. As a {{current_role}} with deep expertise in {{technical_skills}}, I've consistently delivered solutions that drive measurable business impact.

{{experience_paragraph}}

{{technical_paragraph}}

{{project_highlights}}

I'm particularly drawn to {{company_name}}'s work in {{company_focus}}, and I believe my background in {{relevant_expertise}} positions me to contribute from day one.

I'd love to discuss how my technical background aligns with your team's goals. Thank you for considering my application.

Best regards,
{{full_name}}`},{id:"creative",name:"Creative & Marketing",description:"Engaging tone for creative, marketing, and design roles",tone:"creative",template:`Hi {{hiring_manager}},

When I saw the {{job_title}} opening at {{company_name}}, I knew I had to reach out. Your team's work on {{company_project}} resonates deeply with my own passion for {{passion_area}}.

{{story_paragraph}}

{{experience_paragraph}}

{{impact_paragraph}}

I'd love to bring my creative energy and {{years_experience}} years of {{industry}} experience to {{company_name}}. Let's create something amazing together.

Looking forward to connecting,
{{full_name}}`},{id:"executive",name:"Executive/Senior Leadership",description:"High-level focus on strategy, leadership, and business outcomes",tone:"executive",template:`Dear {{hiring_manager}},

With a proven track record of {{key_achievement}} across {{years_experience}} years of leadership in {{industry}}, I am writing to express my interest in the {{job_title}} position at {{company_name}}.

{{leadership_paragraph}}

{{strategy_paragraph}}

{{results_paragraph}}

I am drawn to {{company_name}}'s vision for {{company_vision}}, and I am confident that my experience in {{relevant_expertise}} would drive significant value for your organization.

I welcome the opportunity to discuss how my leadership experience aligns with {{company_name}}'s strategic objectives.

Respectfully,
{{full_name}}`},{id:"career_change",name:"Career Change",description:"For professionals transitioning to a new industry or role",tone:"professional",template:`Dear {{hiring_manager}},

I am excited to apply for the {{job_title}} position at {{company_name}}. While my background is in {{previous_industry}}, my experience has equipped me with highly transferable skills in {{transferable_skills}} that directly apply to this role.

{{transition_paragraph}}

{{transferable_skills_paragraph}}

{{motivation_paragraph}}

I am passionate about {{new_industry}} and have taken proactive steps to prepare for this transition, including {{preparation_steps}}. I am confident that my unique perspective and proven {{key_strength}} will be valuable assets to your team.

Thank you for considering my application. I look forward to discussing how my diverse background can benefit {{company_name}}.

Sincerely,
{{full_name}}`}],x=e=>b.find(t=>t.id===e),k=(e,t)=>{const n=x(e);if(!n)return"";let r=n.template;const a={"{{full_name}}":t.full_name,"{{hiring_manager}}":t.hiring_manager,"{{job_title}}":t.job_title,"{{company_name}}":t.company_name||"[Company Name]","{{years_experience}}":t.years_experience||"[X]","{{industry}}":t.industry,"{{current_role}}":t.current_role||"[Current Role]","{{technical_skills}}":t.technical_skills||"[Technical Skills]","{{relevant_expertise}}":t.relevant_expertise,"{{company_focus}}":t.company_focus,"{{key_achievement}}":t.key_achievement,"{{company_project}}":"[Notable Project]","{{passion_area}}":t.industry,"{{company_vision}}":"[Company Vision]","{{previous_industry}}":"[Previous Industry]","{{transferable_skills}}":"[Transferable Skills]","{{new_industry}}":t.industry,"{{preparation_steps}}":"[Preparation Steps]","{{key_strength}}":"[Key Strength]"},o=w(t),l=I(t),c=j(t);a["{{experience_paragraph}}"]=o,a["{{skills_paragraph}}"]=l,a["{{closing_paragraph}}"]=c,a["{{technical_paragraph}}"]=o,a["{{project_highlights}}"]="",a["{{story_paragraph}}"]="",a["{{impact_paragraph}}"]=o,a["{{leadership_paragraph}}"]=o,a["{{strategy_paragraph}}"]=l,a["{{results_paragraph}}"]=c,a["{{transition_paragraph}}"]=o,a["{{transferable_skills_paragraph}}"]=l,a["{{motivation_paragraph}}"]=c;for(const[u,s]of Object.entries(a))r=r.replace(new RegExp(u.replace(/[{}]/g,"\\$&"),"g"),s);return r=r.replace(/\{\{[\w_]+\}\}/g,""),r.trim()};function w(e){if(!e.resumeText)return"In my current role, I have consistently delivered results that exceed expectations, leveraging my expertise to drive growth and efficiency.";const t=e.years_experience||"several",n=e.current_role||"my current position";return`Throughout my ${t} years of professional experience, particularly in my role as ${n}, I have developed strong capabilities that directly align with this position's requirements. I have consistently delivered measurable results and am known for my ability to tackle complex challenges with innovative solutions.`}function I(e){return e.technical_skills?`My technical expertise includes ${e.technical_skills}, complemented by strong problem-solving abilities and a collaborative approach to teamwork. I stay current with industry trends and continuously expand my skill set to deliver cutting-edge solutions.`:"My skill set spans both technical and interpersonal domains, allowing me to bridge the gap between strategy and execution effectively."}function j(e){return`I am particularly drawn to ${e.company_name||"your organization"}'s commitment to innovation and growth. I am confident that my combination of technical expertise, leadership skills, and passion for excellence would make me a valuable addition to your team.`}function E(e){const t=C(e.jobDescription),n=L(e.resumeText),r={full_name:e.fullName||n.name||"[Your Name]",hiring_manager:e.hiringManager||"Hiring Manager",job_title:e.jobTitle||t.jobTitle||"[Position]",company_name:e.companyName||t.companyName||"[Company]",years_experience:n.yearsExperience||"5+",industry:t.industry||"technology",current_role:n.currentRole||"[Your Current Role]",technical_skills:n.topSkills.join(", ")||"[Your Key Skills]",relevant_expertise:n.topSkills.slice(0,3).join(", ")||"[Your Expertise]",company_focus:t.focus||"innovation",key_achievement:n.topAchievement||"driving measurable results",resumeText:e.resumeText},a=k(e.templateId,r),o=a.split(/\s+/).length,l=T(a,e);return{letter:a,templateUsed:e.templateId,wordCount:o,suggestions:l}}function C(e){const t=e.split(`
`).filter(s=>s.trim());let n=null;const r=[/(?:job\s*title|position|role)\s*[:]\s*(.+)/i,/^(.+?)\s*(?:at|@)\s+/i];for(const s of r){const m=e.match(s);if(m){n=m[1].trim();break}}if(!n&&t.length>0){const s=t[0].trim();s.length<80&&(n=s)}let a=null;const o=[/(?:company|organization|employer)\s*[:]\s*(.+)/i,/(?:at|@)\s+([A-Z][A-Za-z\s&]+)/,/(?:about|join)\s+([A-Z][A-Za-z\s&]+)/i];for(const s of o){const m=e.match(s);if(m){a=m[1].trim();break}}const l={technology:["software","tech","saas","platform","digital"],finance:["fintech","banking","financial","investment","trading"],healthcare:["health","medical","clinical","patient","pharma"],education:["education","learning","academic","university","school"],"e-commerce":["ecommerce","retail","marketplace","shopping","merchant"]};let c=null;const u=e.toLowerCase();for(const[s,m]of Object.entries(l))if(m.some(i=>u.includes(i))){c=s;break}return{jobTitle:n,companyName:a,industry:c,focus:c}}function L(e){const t=e.split(`
`).filter(i=>i.trim()),n=t.length>0&&t[0].trim().length<50?t[0].trim():null;let r=null;const a=[/(?:senior|lead|principal|staff|junior|mid)?\s*(?:\w+\s*){1,3}(?:engineer|developer|designer|manager|analyst|architect|scientist|consultant)/i];for(const i of t.slice(0,5)){for(const d of a){const y=i.match(d);if(y){r=y[0].trim();break}}if(r)break}const o=e.match(/\b(20\d{2}|19\d{2})\b/g);let l=null;if(o&&o.length>=2){const i=o.map(Number).sort(),d=i[i.length-1]-i[0];l=d>0?`${d}+`:null}const c=/\b(javascript|typescript|python|java|react|angular|vue|node\.?js|aws|docker|kubernetes|sql|git|agile|scrum|figma|tableau|excel)\b/gi,u=e.match(c)||[],s=[...new Set(u.map(i=>i.trim()))].slice(0,6);let m=null;for(const i of t)if(/\d+%|\$[\d,]+|\d+x/.test(i)&&i.length>20){m=i.trim().slice(0,100);break}return{name:n,currentRole:r,yearsExperience:l,topSkills:s,topAchievement:m}}function T(e,t){const n=[],r=e.split(/\s+/).length;return r<200&&n.push("Cover letter seems short. Consider adding more specific examples from your experience."),r>500&&n.push("Cover letter is quite long. Aim for 250-400 words for best impact."),(e.includes("[Your Name]")||e.includes("[Company]"))&&n.push("Fill in all placeholder fields for a polished letter."),t.companyName||n.push("Adding the company name makes the letter feel personalized."),(!t.hiringManager||t.hiringManager==="Hiring Manager")&&n.push("Try to find the hiring manager's name on LinkedIn for a personal touch."),n}let f="professional",g="";document.querySelectorAll(".template-btn").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".template-btn").forEach(t=>{t.classList.remove("active-template","border-primary-500","bg-primary-50"),t.classList.add("border-gray-200")}),e.classList.add("active-template","border-primary-500","bg-primary-50"),e.classList.remove("border-gray-200"),f=e.dataset.template||"professional"})});const P=document.getElementById("cl-upload-zone"),h=document.getElementById("cl-resume-file"),_=document.getElementById("cl-resume-text"),p=document.getElementById("cl-resume-status");P.addEventListener("click",()=>h.click());h.addEventListener("change",async()=>{const e=h.files?.[0];if(e){p.classList.remove("hidden"),p.textContent="Parsing...",p.className="mt-2 text-sm text-blue-600";try{const{parsePDF:t}=await v(async()=>{const{parsePDF:n}=await import("./pdfParser.DStAEUP2.js");return{parsePDF:n}},__vite__mapDeps([0,1]));g=await t(e),_.value=g,p.textContent="✓ Parsed successfully",p.className="mt-2 text-sm text-green-600"}catch{p.textContent="Error parsing PDF",p.className="mt-2 text-sm text-red-600"}}});const B=document.getElementById("generate-btn");B.addEventListener("click",()=>{const e=_.value.trim()||g,t=document.getElementById("cl-job-description").value.trim();if(!e){alert("Please provide your resume text.");return}const n=E({resumeText:e,jobDescription:t,templateId:f,fullName:document.getElementById("full-name").value,hiringManager:document.getElementById("hiring-manager").value,companyName:document.getElementById("company-name").value,jobTitle:document.getElementById("job-title").value}),r=document.getElementById("cl-output");r.innerHTML=`<pre class="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">${n.letter}</pre>`;const a=document.getElementById("copy-btn");a.classList.remove("hidden"),a.onclick=()=>{navigator.clipboard.writeText(n.letter),a.textContent="Copied!",setTimeout(()=>{a.textContent="Copy"},2e3)},document.getElementById("cl-stats").classList.remove("hidden"),document.getElementById("cl-word-count").textContent=String(n.wordCount),n.suggestions.length>0&&(document.getElementById("cl-suggestions").classList.remove("hidden"),document.getElementById("cl-suggestions-list").innerHTML=n.suggestions.map(c=>`<li class="flex items-start gap-2 text-sm text-gray-600">
            <svg class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>
            ${c}
          </li>`).join(""))});
