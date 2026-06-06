const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/pdfParser.tEVecNsg.js","_astro/ToolLayout.astro_astro_type_script_index_0_lang.D8_lZC4-.js"])))=>i.map(i=>d[i]);
import{s as _,i as v,V as b,I as w,_ as E}from"./ToolLayout.astro_astro_type_script_index_0_lang.D8_lZC4-.js";import"./hoisted.COzg2ZH2.js";const x=[{id:"professional",name:"Professional Standard",description:"Classic professional cover letter suitable for most industries",tone:"professional",template:`Dear {{hiring_manager}},

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
{{full_name}}`}],j=e=>x.find(t=>t.id===e),C=(e,t)=>{const a=j(e);if(!a)return"";let r=a.template;const n={"{{full_name}}":t.full_name,"{{hiring_manager}}":t.hiring_manager,"{{job_title}}":t.job_title,"{{company_name}}":t.company_name||"[Company Name]","{{years_experience}}":t.years_experience||"[X]","{{industry}}":t.industry,"{{current_role}}":t.current_role||"[Current Role]","{{technical_skills}}":t.technical_skills||"[Technical Skills]","{{relevant_expertise}}":t.relevant_expertise,"{{company_focus}}":t.company_focus,"{{key_achievement}}":t.key_achievement,"{{company_project}}":"[Notable Project]","{{passion_area}}":t.industry,"{{company_vision}}":"[Company Vision]","{{previous_industry}}":"[Previous Industry]","{{transferable_skills}}":"[Transferable Skills]","{{new_industry}}":t.industry,"{{preparation_steps}}":"[Preparation Steps]","{{key_strength}}":"[Key Strength]"},o=T(t),s=L(t),c=P(t);n["{{experience_paragraph}}"]=o,n["{{skills_paragraph}}"]=s,n["{{closing_paragraph}}"]=c,n["{{technical_paragraph}}"]=o,n["{{project_highlights}}"]="",n["{{story_paragraph}}"]="",n["{{impact_paragraph}}"]=o,n["{{leadership_paragraph}}"]=o,n["{{strategy_paragraph}}"]=s,n["{{results_paragraph}}"]=c,n["{{transition_paragraph}}"]=o,n["{{transferable_skills_paragraph}}"]=s,n["{{motivation_paragraph}}"]=c;for(const[i,m]of Object.entries(n))r=r.replace(new RegExp(i.replace(/[{}]/g,"\\$&"),"g"),m);return r=r.replace(/\{\{[\w_]+\}\}/g,""),r.trim()};function T(e){if(!e.resumeText)return"In my current role, I have consistently delivered results that exceed expectations, leveraging my expertise to drive growth and efficiency.";const t=e.years_experience||"several",a=e.current_role||"my current position";return`Throughout my ${t} years of professional experience, particularly in my role as ${a}, I have developed strong capabilities that directly align with this position's requirements. I have consistently delivered measurable results and am known for my ability to tackle complex challenges with innovative solutions.`}function L(e){return e.technical_skills?`My technical expertise includes ${e.technical_skills}, complemented by strong problem-solving abilities and a collaborative approach to teamwork. I stay current with industry trends and continuously expand my skill set to deliver cutting-edge solutions.`:"My skill set spans both technical and interpersonal domains, allowing me to bridge the gap between strategy and execution effectively."}function P(e){return`I am particularly drawn to ${e.company_name||"your organization"}'s commitment to innovation and growth. I am confident that my combination of technical expertise, leadership skills, and passion for excellence would make me a valuable addition to your team.`}function S(e){const t=_(e.resumeText),a=_(e.jobDescription);if(!v(t,b.MIN_RESUME_LENGTH))return g("Resume must have at least 50 characters");if(!v(a,b.MIN_JOB_DESCRIPTION_LENGTH))return g("Job description must have at least 50 characters");if(!N(e.templateId))return g(`Template "${e.templateId}" not found. Please select a valid template.`);const r=B(a),n=D(t),o={full_name:e.fullName||n.name||"[Your Name]",hiring_manager:e.hiringManager||"Hiring Manager",job_title:e.jobTitle||r.jobTitle||"[Position]",company_name:e.companyName||r.companyName||"[Company]",years_experience:n.yearsExperience||"5+",industry:r.industry||"technology",current_role:n.currentRole||"[Your Current Role]",technical_skills:n.topSkills.join(", ")||"[Your Key Skills]",relevant_expertise:n.topSkills.slice(0,3).join(", ")||"[Your Expertise]",company_focus:r.focus||"innovation",key_achievement:n.topAchievement||"driving measurable results",resumeText:t},s=C(e.templateId,o),c=s.split(/\s+/).length,i=M(s,e);return{letter:s,templateUsed:e.templateId,wordCount:c,suggestions:i}}function g(e){return{letter:"",templateUsed:"",wordCount:0,suggestions:[e]}}function N(e){return x.some(t=>t.id===e)}function B(e){const t=e.split(`
`).filter(i=>i.trim());let a=null;const r=[/(?:job\s*title|position|role)\s*[:]\s*(.+)/i,/^(.+?)\s*(?:at|@)\s+/i];for(const i of r){const m=e.match(i);if(m){a=m[1].trim();break}}if(!a&&t.length>0){const i=t[0].trim();i.length<80&&(a=i)}let n=null;const o=[/(?:company|organization|employer)\s*[:]\s*(.+)/i,/(?:at|@)\s+([A-Z][A-Za-z\s&]+)/,/(?:about|join)\s+([A-Z][A-Za-z\s&]+)/i];for(const i of o){const m=e.match(i);if(m){n=m[1].trim();break}}let s=null;const c=e.toLowerCase();for(const[i,m]of Object.entries(w))if(m.some(u=>c.includes(u))){s=i;break}return{jobTitle:a,companyName:n,industry:s,focus:s}}function D(e){const t=e.split(`
`).filter(l=>l.trim()),a=t.length>0&&t[0].trim().length<50?t[0].trim():null;let r=null;const n=[/(?:senior|lead|principal|staff|junior|mid)?\s*(?:\w+\s*){1,3}(?:engineer|developer|designer|manager|analyst|architect|scientist|consultant)/i];for(const l of t.slice(0,5)){for(const d of n){const f=l.match(d);if(f){r=f[0].trim();break}}if(r)break}const o=e.match(/\b(20\d{2}|19\d{2})\b/g);let s=null;if(o&&o.length>=2){const l=o.map(Number).sort(),d=l[l.length-1]-l[0];s=d>0?`${d}+`:null}const c=/\b(javascript|typescript|python|java|react|angular|vue|node\.?js|aws|docker|kubernetes|sql|git|agile|scrum|figma|tableau|excel)\b/gi,i=e.match(c)||[],m=[...new Set(i.map(l=>l.trim()))].slice(0,6);let u=null;for(const l of t)if(/\d+%|\$[\d,]+|\d+x/.test(l)&&l.length>20){u=l.trim().slice(0,100);break}return{name:a,currentRole:r,yearsExperience:s,topSkills:m,topAchievement:u}}function M(e,t){const a=[],r=e.split(/\s+/).length;return r<200&&a.push("Cover letter seems short. Consider adding more specific examples from your experience."),r>500&&a.push("Cover letter is quite long. Aim for 250-400 words for best impact."),(e.includes("[Your Name]")||e.includes("[Company]"))&&a.push("Fill in all placeholder fields for a polished letter."),t.companyName||a.push("Adding the company name makes the letter feel personalized."),(!t.hiringManager||t.hiringManager==="Hiring Manager")&&a.push("Try to find the hiring manager's name on LinkedIn for a personal touch."),a}let k="professional",h="";document.querySelectorAll(".template-btn").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".template-btn").forEach(t=>{t.classList.remove("active-template","border-primary-500","bg-primary-50"),t.classList.add("border-gray-200")}),e.classList.add("active-template","border-primary-500","bg-primary-50"),e.classList.remove("border-gray-200"),k=e.dataset.template||"professional"})});const R=document.getElementById("cl-upload-zone"),y=document.getElementById("cl-resume-file"),I=document.getElementById("cl-resume-text"),p=document.getElementById("cl-resume-status");R.addEventListener("click",()=>y.click());y.addEventListener("change",async()=>{const e=y.files?.[0];if(e){p.classList.remove("hidden"),p.textContent="Parsing...",p.className="mt-2 text-sm text-blue-600";try{const{parsePDF:t}=await E(async()=>{const{parsePDF:a}=await import("./pdfParser.tEVecNsg.js");return{parsePDF:a}},__vite__mapDeps([0,1]));h=await t(e),I.value=h,p.textContent="✓ Parsed successfully",p.className="mt-2 text-sm text-green-600"}catch{p.textContent="Error parsing PDF",p.className="mt-2 text-sm text-red-600"}}});const A=document.getElementById("generate-btn");A.addEventListener("click",()=>{const e=I.value.trim()||h,t=document.getElementById("cl-job-description").value.trim();if(!e){alert("Please provide your resume text.");return}const a=S({resumeText:e,jobDescription:t,templateId:k,fullName:document.getElementById("full-name").value,hiringManager:document.getElementById("hiring-manager").value,companyName:document.getElementById("company-name").value,jobTitle:document.getElementById("job-title").value}),r=document.getElementById("cl-output");r.innerHTML=`<pre class="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">${a.letter}</pre>`;const n=document.getElementById("copy-btn");n.classList.remove("hidden"),n.onclick=()=>{navigator.clipboard.writeText(a.letter),n.textContent="Copied!",setTimeout(()=>{n.textContent="Copy"},2e3)},document.getElementById("cl-stats").classList.remove("hidden"),document.getElementById("cl-word-count").textContent=String(a.wordCount),a.suggestions.length>0&&(document.getElementById("cl-suggestions").classList.remove("hidden"),document.getElementById("cl-suggestions-list").innerHTML=a.suggestions.map(c=>`<li class="flex items-start gap-2 text-sm text-gray-600">
            <svg class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>
            ${c}
          </li>`).join(""))});
