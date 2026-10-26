const PROGRAMS = [
 {id:1,title:'Pandas Data Handling',desc:'Create, read, inspect and export structured datasets using Pandas.',subs:[['1A','Create and read a DataFrame'],['1B','Read and export structured data'],['1C','JSON / Excel data handling']]},
 {id:2,title:'Data Acquisition and Database Handling',desc:'Acquire data and work with database records.',subs:[['2A','Data acquisition using API'],['2B','Database handling with SQLite']]},
 {id:3,title:'Data Cleaning and Preprocessing',desc:'Handle missing values, transform data and detect outliers.',subs:[['3A','Handle missing values'],['3B','Transform and normalize data'],['3C','Detect outliers'],['3D','Text preprocessing']]},
 {id:4,title:'Hierarchical Indexing and Data Combination',desc:'Explore MultiIndex, stack/unstack and combine DataFrames.',subs:[['4A','Hierarchical indexing'],['4B','Stack and unstack'],['4C','Combine DataFrames']]},
 {id:5,title:'Data Visualization',desc:'Create clear visualizations for data exploration.',subs:[['5A','Bar chart'],['5B','Line chart'],['5C','Pie chart'],['5D','Histogram'],['5E','Scatter plot']]},
 {id:6,title:'Time Series Analysis',desc:'Work with dates, time zones, periods and resampling.',subs:[['6A','Create Time Series'],['6B','Generate DatetimeIndex'],['6C','Time Zone Conversion'],['6D','Period Arithmetic'],['6E','Period / PeriodIndex asfreq'],['6F','Convert Series/DataFrame to Periods'],['6G','Resampling, Downsampling and Upsampling']]},
 {id:7,title:'Data Aggregation',desc:'Group records and calculate aggregate statistics for exploratory analysis.',subs:[['7A','GroupBy single/multiple keys'],['7B','Aggregate summary statistics'],['7C','GroupBy and exploratory data analysis']]},
 {id:8,title:'Web Scraping and Review Sentiment Analysis',desc:'Extract permitted product reviews, explore text, and analyze sentiment with NLTK and VADER.',subs:[['8A','Web scraping with Beautiful Soup'],['8B','Review EDA and WordCloud'],['8C','Text statistics and distributions'],['8D','NLTK / VADER sentiment analysis'],['8E','Sentiment intensity scatter plot']]},
 {id:9,title:'Customer Personality Analysis',desc:'Explore customer purchasing behavior and segment customers using K-Means clustering.',subs:[['9A','Customer data preprocessing'],['9B','Income and spending EDA'],['9C','K-Means customer segmentation'],['9D','Evaluate customer segments']]},
 {id:10,title:'Text Emotion Detection',desc:'Train a text classifier to predict emotions and display a matching emoji.',subs:[['10A','Prepare labeled emotion data'],['10B','Text preprocessing and TF-IDF'],['10C','Train and evaluate classifier'],['10D','Predict emotion and emoji']]}

];
const STARTERS = {
'1A':`import pandas as pd\ndata = {'Name':['Priya','Ravi','Anu'], 'Marks':[92,85,88]}\ndf = pd.DataFrame(data)\nprint('Student DataFrame:')\nprint(df)\nprint('\\nShape:', df.shape)`,
'1B':`import pandas as pd\nfrom io import StringIO\ncsv_data = 'Name,Marks\\nPriya,92\\nRavi,85\\nAnu,88'\ndf = pd.read_csv(StringIO(csv_data))\nprint(df)\nprint('Average marks:', df['Marks'].mean())\nprint('CSV preview:')\nprint(df.to_csv(index=False))`,
'1C':`import pandas as pd\nimport json\ndata = [{'name':'Priya','marks':92},{'name':'Ravi','marks':85}]\ndf = pd.DataFrame(data)\nprint('DataFrame:')\nprint(df)\nprint('JSON:')\nprint(df.to_json(orient='records', indent=2))`,
'2A':`import pandas as pd\n# Demo data stands in for an API response (internet APIs may need credentials).\nresponse = [{'id':1,'name':'Priya'},{'id':2,'name':'Ravi'}]\ndf = pd.DataFrame(response)\nprint('Acquired records:')\nprint(df)\nprint('Rows acquired:', len(df))`,
'2B':`import sqlite3\nimport pandas as pd\nconn = sqlite3.connect(':memory:')\ndf = pd.DataFrame({'id':[1,2,3], 'name':['Priya','Ravi','Anu'], 'marks':[92,85,88]})\ndf.to_sql('students', conn, index=False, if_exists='replace')\nresult = pd.read_sql_query('SELECT * FROM students WHERE marks >= 88', conn)\nprint(result)\nconn.close()`,
'3A':`import pandas as pd\ndf = pd.DataFrame({'Name':['A','B','C','D'], 'Marks':[80,None,95,None]})\nprint('Before:')\nprint(df)\ndf['Marks'] = df['Marks'].fillna(df['Marks'].mean())\nprint('\\nAfter filling missing marks with mean:')\nprint(df)`,
'3B':`import pandas as pd\ndf = pd.DataFrame({'Marks':[40,60,80,100]})\ndf['Normalized'] = (df['Marks']-df['Marks'].min())/(df['Marks'].max()-df['Marks'].min())\nprint(df)`,
'3C':`import pandas as pd\ndf = pd.DataFrame({'Marks':[45,48,50,52,55,99]})\nq1=df['Marks'].quantile(.25); q3=df['Marks'].quantile(.75); iqr=q3-q1\noutliers=df[(df['Marks'] < q1-1.5*iqr) | (df['Marks'] > q3+1.5*iqr)]\nprint('Q1:',q1,'Q3:',q3,'IQR:',iqr)\nprint('Possible outliers:')\nprint(outliers)`,
'3D':`import re\ntexts = ['Data Science!!', 'PYTHON, Pandas.', ' Clean   data  ']\ncleaned = [re.sub(r'[^a-z0-9 ]','',t.lower()).strip() for t in texts]\ncleaned = [' '.join(t.split()) for t in cleaned]\nprint('Original:', texts)\nprint('Cleaned:', cleaned)`,
'4A':`import pandas as pd\nindex = pd.MultiIndex.from_tuples([('CSE',2),('CSE',3),('ECE',2),('ECE',3)], names=['Branch','Year'])\ndf = pd.DataFrame({'Students':[45,42,38,40]}, index=index)\nprint(df)\nprint('\\nCSE records:')\nprint(df.loc['CSE'])`,
'4B':`import pandas as pd\ndf = pd.DataFrame({'Branch':['CSE','CSE','ECE','ECE'],'Year':[2,3,2,3],'Marks':[80,90,75,85]})\nwide=df.set_index(['Branch','Year'])\nprint('MultiIndex:')\nprint(wide)\nprint('\\nUnstacked:')\nprint(wide.unstack())\nprint('\\nStacked again:')\nprint(wide.unstack().stack())`,
'4C':`import pandas as pd\na=pd.DataFrame({'id':[1,2,3], 'name':['Priya','Ravi','Anu']})\nb=pd.DataFrame({'id':[1,2,3], 'marks':[92,85,88]})\nprint('Merge:')\nprint(pd.merge(a,b,on='id'))\nprint('Concatenate:')\nprint(pd.concat([a,b.drop(columns='id')],axis=1))`,
'5A':`import pandas as pd\ndf=pd.DataFrame({'Subject':['Python','Pandas','SQL'], 'Marks':[88,94,82]})\nprint('Bar chart data:')\nprint(df)\nprint('Highest:', df.loc[df['Marks'].idxmax(),'Subject'])\n# To display charts, use matplotlib in a notebook environment.`,
'5B':`import pandas as pd\ndf=pd.DataFrame({'Day':[1,2,3,4,5], 'Temperature':[28,30,29,32,31]})\nprint(df)\nprint('Change from day 1 to day 5:', df['Temperature'].iloc[-1]-df['Temperature'].iloc[0])`,
'5C':`import pandas as pd\ndf=pd.DataFrame({'Category':['A','B','C'], 'Count':[30,45,25]})\ndf['Percentage']=df['Count']/df['Count'].sum()*100\nprint(df)`,
'5D':`import pandas as pd\nmarks=[45,55,60,62,65,70,72,75,80,85,90,95]\ncounts, edges = __import__('numpy').histogram(marks,bins=4)\nprint('Bin edges:', edges)\nprint('Frequency per bin:', counts)`,
'5E':`import pandas as pd\ndf=pd.DataFrame({'StudyHours':[1,2,3,4,5], 'Marks':[45,55,65,75,90]})\nprint(df)\nprint('Correlation:')\nprint(df.corr(numeric_only=True))`,
'6A':`import pandas as pd\ndates=pd.to_datetime(['2026-01-01','2026-01-02','2026-01-03','2026-01-04','2026-01-05'])\ntemperature=[28,30,29,31,32]\ntime_series=pd.Series(temperature,index=dates)\nprint('Time Series:')\nprint(time_series)`,
'6B':`import pandas as pd\ndate_index=pd.date_range(start='2026-01-01',periods=7,freq='D')\nprint('Generated DatetimeIndex:')\nprint(date_index)`,
'6C':`import pandas as pd\ndates=pd.date_range(start='2026-01-01 09:00',periods=3,freq='h')\nlocalized=dates.tz_localize('Asia/Kolkata')\nconverted=localized.tz_convert('America/New_York')\nprint('India time:')\nprint(localized)\nprint('New York time:')\nprint(converted)`,
'6D':`import pandas as pd\np=pd.Period('2026-01',freq='M')\nprint('Original:',p)\nprint('Plus 2 months:',p+2)\nprint('Minus 1 month:',p-1)\nprint('Period range:')\nprint(pd.period_range(start='2026-01',periods=6,freq='M'))`,
'6E':`import pandas as pd\np=pd.Period('2026-01',freq='M')\nprint('Month start:',p.asfreq('D',how='start'))\nprint('Month end:',p.asfreq('D',how='end'))\nperiod_index=pd.period_range(start='2026-01',periods=3,freq='M')\nprint(period_index.asfreq('D',how='start'))`,
'6F':`import pandas as pd\ndates=pd.to_datetime(['2026-01-10','2026-02-15','2026-03-20','2026-04-25'])\nsales=pd.Series([1000,1500,1800,2200],index=dates)\nprint('Series as monthly periods:')\nprint(sales.to_period('M'))\ndf=pd.DataFrame({'Sales':[1000,1500,1800,2200],'Profit':[200,300,400,500]},index=dates)\nprint('DataFrame as monthly periods:')\nprint(df.to_period('M'))`,
'6G':`import pandas as pd\ndates=pd.date_range(start='2026-01-01 00:00',periods=12,freq='h')\nvalues=[10,12,15,14,18,20,22,21,25,28,30,32]\nts=pd.Series(values,index=dates)\nprint('3-hour mean:')\nprint(ts.resample('3h').mean())\nprint('30-minute upsample with forward fill:')\nprint(ts.resample('30min').ffill().head(8))`,
'7A':`import pandas as pd\ndata={'Name':['Ravi','Sita','Arun','Priya','Kiran','Anil'],'Department':['CSE','CSE','ECE','ECE','CSE','ECE'],'Year':[2,2,3,3,2,3],'Marks':[85,90,78,88,75,82]}\ndf=pd.DataFrame(data)\nprint('Average marks by department:')\nprint(df.groupby('Department')['Marks'].mean())\nprint('By department and year:')\nprint(df.groupby(['Department','Year'])['Marks'].mean())`,
'7B':`import pandas as pd\ndata={'Department':['CSE','CSE','ECE','ECE','EEE','EEE'],'Marks':[80,75,70,65,90,85],'Attendance':[90,85,80,75,95,90]}\ndf=pd.DataFrame(data)\nresult=df.groupby('Department').agg({'Marks':['sum','mean','std'],'Attendance':['sum','mean','std']})\nprint(result)`,
'7C':`import pandas as pd\ndf=pd.DataFrame({'Department':['CSE','CSE','ECE','ECE','EEE','EEE'],'Marks':[80,95,70,85,90,88],'Attendance':[90,95,80,85,95,92]})\nprint('Preview:')\nprint(df.head())\nprint('Summary statistics:')\nprint(df.describe(numeric_only=True))\nprint('Department summary:')\nprint(df.groupby('Department').agg({'Marks':['count','mean','min','max'],'Attendance':'mean'}))`,
'8A':`from bs4 import BeautifulSoup
import pandas as pd
html='<div class="review"><b class="review-title">Great</b><p class="review-text">Excellent quality and fast delivery</p><span class="rating">5</span></div>'
soup=BeautifulSoup(html,'html.parser')
rows=[]
for block in soup.select('.review'):
    rows.append({'title':block.select_one('.review-title').get_text(strip=True),'review':block.select_one('.review-text').get_text(' ',strip=True),'rating':block.select_one('.rating').get_text(strip=True)})
df=pd.DataFrame(rows); print(df); print('Extracted:',len(df))`,
'8B':`import pandas as pd
import matplotlib.pyplot as plt
from wordcloud import WordCloud
reviews=['Excellent quality and useful','Poor product and bad delivery','Good value and excellent service']
df=pd.DataFrame({'review':reviews}); print(df)
cloud=WordCloud(width=800,height=400,background_color='white').generate(' '.join(reviews))
plt.imshow(cloud,interpolation='bilinear'); plt.axis('off'); plt.title('Review WordCloud'); plt.show()`,
'8C':`import re, pandas as pd
reviews=['The product is great 10/10','Not good, broken after 2 days','Very useful and easy']
def stats(t):
    words=re.findall(r"\b[\w']+\b",t.lower()); nums=re.findall(r"\b\d+(?:\.\d+)?\b",t)
    return pd.Series({'word_count':len(words),'character_count':len(t),'numeric_count':len(nums),'average_word_length':sum(map(len,words))/len(words) if words else 0})
df=pd.DataFrame({'review':reviews}); df=pd.concat([df,df.review.apply(stats)],axis=1); print(df)`,
'8D':`from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
reviews=['Excellent product, I love it','Very poor quality','It is okay']; analyzer=SentimentIntensityAnalyzer()
for review in reviews:
 score=analyzer.polarity_scores(review)['compound']; label='Positive' if score>=.05 else ('Negative' if score<=-.05 else 'Neutral')
 print(review,'|',score,'|',label)`,
'8E':`import matplotlib.pyplot as plt
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
reviews=['Excellent','Very bad','Okay','I love this','Not useful']; a=SentimentIntensityAnalyzer()
scores=[a.polarity_scores(t)['compound'] for t in reviews]
plt.scatter(range(1,len(scores)+1),scores); plt.axhline(.05,linestyle='--'); plt.axhline(-.05,linestyle='--'); plt.axhline(0,linestyle=':')
plt.ylim(-1.05,1.05); plt.xlabel('Review Index'); plt.ylabel('VADER Compound'); plt.title('Sentiment Intensity'); plt.show()`,
'9A':`import pandas as pd
from sklearn.preprocessing import StandardScaler
df=pd.DataFrame({'Income':[15,20,60,80,100],'Spending':[20,35,65,80,95]})
df=df.fillna(df.median(numeric_only=True)); X=StandardScaler().fit_transform(df)
print('Clean data:'); print(df); print('Standardized:'); print(pd.DataFrame(X,columns=df.columns).round(2))`,
'9B':`import pandas as pd
import matplotlib.pyplot as plt
df=pd.DataFrame({'Annual Income':[15,20,60,80,100],'Spending Score':[20,35,65,80,95]})
print(df.describe()); plt.scatter(df['Annual Income'],df['Spending Score']); plt.xlabel('Annual Income (k$)'); plt.ylabel('Spending Score'); plt.title('Income vs Spending'); plt.show()`,
'9C':`import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
df=pd.DataFrame({'Annual Income (k$)':[15,20,25,60,65,70,100,110],'Spending Score (1-100)':[20,25,35,65,70,80,20,30]})
X=df[['Annual Income (k$)','Spending Score (1-100)']]
model=KMeans(n_clusters=3,random_state=0,n_init=10); df['Cluster']=model.fit_predict(X); print(df)
plt.scatter(X.iloc[:,0],X.iloc[:,1],c=df.Cluster); plt.xlabel('Annual Income'); plt.ylabel('Spending Score'); plt.title('Customer Segments'); plt.show()`,
'9D':`from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
X=[[15,20],[20,25],[25,35],[60,65],[65,70],[70,80],[100,20],[110,30]]
for k in range(2,5):
 model=KMeans(n_clusters=k,random_state=42,n_init=10); labels=model.fit_predict(X)
 print('K=',k,'inertia=',round(model.inertia_,2),'silhouette=',round(silhouette_score(X,labels),3))`,
'10A':`import pandas as pd
data={'text':['I am happy today','I feel lonely','This makes me furious','I am afraid','I love you','What a surprise'],'emotion':['happy','sadness','anger','fear','love','surprise']}
df=pd.DataFrame(data); print(df); print(df.emotion.value_counts())`,
'10B':`from sklearn.feature_extraction.text import TfidfVectorizer
texts=['I am happy today','I feel lonely','I am very angry','I love this']
vec=TfidfVectorizer(ngram_range=(1,2)); X=vec.fit_transform(texts)
print('Vocabulary:',vec.get_feature_names_out()); print('Matrix shape:',X.shape); print(X.toarray().round(2))`,
'10C':`from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
texts=['happy day','wonderful','sad lonely','miss family','angry furious','hate this','love you','adore you','scared dark','afraid']
labels=['happy','happy','sadness','sadness','anger','anger','love','love','fear','fear']
model=Pipeline([('tfidf',TfidfVectorizer()),('clf',LogisticRegression(max_iter=1000))]); model.fit(texts,labels)
print('Accuracy:',accuracy_score(labels,model.predict(texts))); print(model.predict(texts))`,
'10D':`from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
texts=['happy wonderful cheerful','sad lonely upset','angry furious hate','scared afraid fear','love adore caring','wow amazing surprise']; labels=['happy','sadness','anger','fear','love','surprise']
model=Pipeline([('tfidf',TfidfVectorizer()),('clf',LogisticRegression(max_iter=1000))]); model.fit(texts,labels)
emojis={'happy':'😊','sadness':'😢','anger':'😠','fear':'😨','love':'❤️','surprise':'😲'}
for t in ['I am happy to see you','I feel lonely today','I love my family']:
 e=model.predict([t])[0]; print(t,'=>',e,emojis[e])`
};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let current={program:1,sub:'1A'}, pyodide=null, pyodideLoading=null;
const DB_NAME='priyanka-ds-portal-db';
function openDB(){return new Promise((resolve,reject)=>{const req=indexedDB.open(DB_NAME,1);req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('items'))req.result.createObjectStore('items')};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
async function dbGet(key){const db=await openDB();return new Promise((resolve,reject)=>{const r=db.transaction('items').objectStore('items').get(key);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
async function dbSet(key,value){const db=await openDB();return new Promise((resolve,reject)=>{const r=db.transaction('items','readwrite').objectStore('items').put(value,key);r.onsuccess=()=>resolve();r.onerror=()=>reject(r.error)})}
async function dbDelete(key){const db=await openDB();return new Promise((resolve,reject)=>{const r=db.transaction('items','readwrite').objectStore('items').delete(key);r.onsuccess=()=>resolve();r.onerror=()=>reject(r.error)})}
async function dbKeys(){const db=await openDB();return new Promise((resolve,reject)=>{const r=db.transaction('items').objectStore('items').getAllKeys();r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function toast(message){const t=$('#toast');if(!t)return;t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}
function navigate(view){$$('.view').forEach(v=>v.classList.toggle('active-view',v.id===view));$$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));$('#pageTitle').textContent=({lab:'Lab Programs',modules:'Modules / Syllabus',profile:'My Profile',settings:'Settings',dashboard:'Dashboard'})[view]||'Dashboard';if(view==='modules')renderModules();if(view==='lab')renderPrograms()}
$$('[data-view]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.view)));$$('[data-go]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.go)));$('#topProfile')?.addEventListener('click',()=>navigate('profile'));$('#sideProfile')?.addEventListener('click',()=>navigate('profile'));$('#logoutBtn')?.addEventListener('click',()=>toast('This is a local demo portal; no server login is connected.'));
function renderDashboard(){const subCount=PROGRAMS.reduce((n,p)=>n+p.subs.length,0);$('#subCount').textContent=subCount;$('#dashboardPrograms').innerHTML=PROGRAMS.map(p=>`<article class="program-card" data-open-program="${p.id}"><img class="program-thumb" src="images/experiment-${p.id}.svg" alt="${p.title} illustration"><span class="num">PROGRAM ${String(p.id).padStart(2,'0')}</span><h3>${p.title}</h3><p>${p.desc}</p><div class="chips">${p.subs.map(s=>`<span class="chip">${s[0]}</span>`).join('')}</div></article>`).join('');$$('[data-open-program]').forEach(c=>c.addEventListener('click',()=>{navigate('lab');openProgram(Number(c.dataset.openProgram))}))}
function renderPrograms(){const q=($('#searchInput')?.value||'').toLowerCase();const arr=PROGRAMS.filter(p=>(p.title+' '+p.desc+' '+p.subs.flat().join(' ')).toLowerCase().includes(q));$('#programList').innerHTML=arr.map(p=>`<article class="program-item" data-program="${p.id}"><button class="program-head" data-toggle="${p.id}"><img class="program-list-thumb" src="images/experiment-${p.id}.svg" alt=""><span class="program-num">${String(p.id).padStart(2,'0')}</span><span><strong>${p.title}</strong><small>${p.subs.length} sub-programs</small></span><b>›</b></button><div class="sub-list">${p.subs.map(s=>`<button class="sub-btn" data-open-sub="${s[0]}">${s[0]} — ${s[1]}</button>`).join('')}</div></article>`).join('')||'<div class="empty">No matching programs.</div>';$$('[data-toggle]').forEach(b=>b.addEventListener('click',()=>openProgram(Number(b.dataset.toggle))));$$('[data-open-sub]').forEach(b=>b.addEventListener('click',()=>openSubprogram(b.dataset.openSub)));}
$('#searchInput')?.addEventListener('input',renderPrograms);
function findSub(code){for(const p of PROGRAMS){const sub=p.subs.find(s=>s[0]===code);if(sub)return {p,sub}}return null}
function openProgram(id){const p=PROGRAMS[id-1];if(!p)return;$('#modalProgramNo').textContent=`PROGRAM ${String(p.id).padStart(2,'0')}`;$('#modalProgramTitle').textContent=p.title;$('#modalProgramDesc').textContent=p.desc;$('#subTabs').innerHTML=p.subs.map(s=>`<button data-subtab="${s[0]}">${s[0]} · ${s[1]}</button>`).join('');$$('[data-subtab]').forEach(b=>b.addEventListener('click',()=>openSubprogram(b.dataset.subtab)));$('#programModal').classList.add('show');openSubprogram(p.subs[0][0]);}
async function openSubprogram(code){const found=findSub(code);if(!found)return;current={program:found.p.id,sub:code};$('#modalProgramNo').textContent=`PROGRAM ${String(found.p.id).padStart(2,'0')} · ${code}`;$('#modalProgramTitle').textContent=found.p.title;$('#modalProgramDesc').textContent=found.p.desc;$$('[data-subtab]').forEach(b=>b.classList.toggle('active',b.dataset.subtab===code));$('#detailOverview').textContent=`${code}: ${found.sub[1]}. Edit the starter code below or paste your own practical code. Save your edits before switching sub-programs.`;$('#codeEditor').value=localStorage.getItem('ds-code-'+code) ?? (STARTERS[code]||`# ${code} - ${found.sub[1]}\nprint("Add your lab code here")`);$('#detailOutput').textContent='Ready. Click “Run Python” to execute the code and display its output here.';$('#detailOutput').classList.remove('error');const yt=localStorage.getItem('ds-youtube-'+code)||'';$('#youtubeUrl').value=yt;updateYoutubeLink(yt);await loadProgramImage(code);}
function updateYoutubeLink(url){const a=$('#youtubeLink');if(/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(url)){a.href=url;a.hidden=false;a.textContent='Open related YouTube video ↗'}else{a.removeAttribute('href');a.hidden=true}}
$('#saveYoutube')?.addEventListener('click',()=>{const u=$('#youtubeUrl').value.trim();if(u&&!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(u)){toast('Enter a valid YouTube URL.');return}localStorage.setItem('ds-youtube-'+current.sub,u);updateYoutubeLink(u);toast('Video link saved for '+current.sub)});
async function loadProgramImage(code){const data=await dbGet('image-'+code);const img=$('#programImage');const caption=$('#imageCaption');const programId=findSub(code)?.p.id||current.program||1;img.hidden=false;img.onerror=()=>{img.onerror=null;img.src='images/experiment-'+programId+'.svg'};if(data){img.src=data;if(caption)caption.textContent='Your saved image for '+code}else{img.src='images/experiment-'+programId+'.svg';if(caption)caption.textContent='Built-in illustration for Program '+programId+'. Add your own image only if you want to replace it.'}}
$('#programImageInput')?.addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;if(!f.type.startsWith('image/')){toast('Please choose an image file.');return}if(f.size>12*1024*1024){toast('Choose an image smaller than 12 MB.');return}const reader=new FileReader();reader.onload=async()=>{try{await dbSet('image-'+current.sub,reader.result);await loadProgramImage(current.sub);toast('Image saved for '+current.sub)}catch(err){toast('Could not save image. Try a smaller image.')}};reader.readAsDataURL(f);e.target.value=''});
$('#removeProgramImage')?.addEventListener('click',async()=>{await dbDelete('image-'+current.sub);await loadProgramImage(current.sub);toast('Image removed from '+current.sub)});
$('#programImage')?.addEventListener('click',()=>{if($('#programImage').src)window.open($('#programImage').src,'_blank','noopener')});
$('#saveCode')?.addEventListener('click',()=>{localStorage.setItem('ds-code-'+current.sub,$('#codeEditor').value);toast('Code saved for '+current.sub)});
$('#copyCode')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#codeEditor').value);toast('Code copied')}catch(e){$('#codeEditor').select();document.execCommand('copy');toast('Code copied')}});
$('#resetCode')?.addEventListener('click',()=>{const f=findSub(current.sub);$('#codeEditor').value=STARTERS[current.sub]||`# ${current.sub}\nprint("Add your lab code here")`;$('#detailOutput').textContent='Editor reset to starter code.';$('#detailOutput').classList.remove('error')});
$('#runCode')?.addEventListener('click',runPython);
async function runPython(){const out=$('#detailOutput'),btn=$('#runCode'),code=$('#codeEditor').value;out.classList.remove('error');out.textContent='Starting Python runtime… First run may take a little time and requires an internet connection.';btn.disabled=true;btn.textContent='Loading…';try{if(!window.loadPyodide)throw new Error('Python runtime could not load. Check your internet connection and reopen the page.');if(!pyodideLoading){pyodideLoading=(async()=>{pyodide=await loadPyodide();return pyodide})();}pyodide=await pyodideLoading;out.textContent='Preparing Python packages…';await pyodide.loadPackagesFromImports(code);let stdout='',stderr='';pyodide.setStdout({batched:s=>{stdout+=s+'\n'}});pyodide.setStderr({batched:s=>{stderr+=s+'\n'}});try{await pyodide.runPythonAsync(code);out.textContent=(stdout+stderr).trim()||'Code ran successfully with no printed output.';if(stderr.trim())out.classList.add('error')}catch(err){out.textContent=(stdout?stdout+'\n':'')+'ERROR:\n'+String(err);out.classList.add('error')}}catch(err){out.textContent='Could not run Python in the browser.\n'+String(err)+'\n\nTip: use Chrome/Edge with an internet connection. If the code requires unsupported packages or local files, run it in Google Colab/Jupyter.';out.classList.add('error')}finally{btn.disabled=false;btn.textContent='▶ Run Python'}}
$('#closeModal')?.addEventListener('click',()=>$('#programModal').classList.remove('show'));$('#programModal')?.addEventListener('click',e=>{if(e.target.id==='programModal')$('#programModal').classList.remove('show')});
function fileToDataURL(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.readAsDataURL(file)})}
async function getModules(){return (await dbGet('modules'))||[]}
async function setModules(items){await dbSet('modules',items)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
async function renderModules(){const files=await getModules();$('#moduleFiles').innerHTML=files.length?files.map((m,i)=>`<article class="file-card"><div class="program-num">${m.type==='PDF'?'PDF':m.type==='PPT/PPTX'?'PPT':'FILE'}</div><h3>${esc(m.title)}</h3><p>${esc(m.name)}<br>${esc(m.date)}</p><div class="file-actions"><button class="small-action" data-module-open="${i}">Open</button><button class="small-action" data-module-download="${i}">Download</button><button class="small-action" data-module-delete="${i}">Delete</button></div></article>`).join(''):'<div class="empty"><h3>No modules added yet</h3><p>Click “Add File” to upload your college syllabus PDF or PPT.</p></div>';$$('[data-module-open]').forEach(b=>b.addEventListener('click',()=>openModule(Number(b.dataset.moduleOpen))));$$('[data-module-download]').forEach(b=>b.addEventListener('click',()=>downloadModule(Number(b.dataset.moduleDownload))));$$('[data-module-delete]').forEach(b=>b.addEventListener('click',()=>deleteModule(Number(b.dataset.moduleDelete))));}
$('#moduleFileInput')?.addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;const title=prompt('Enter a title for this module:',f.name.replace(/\.[^.]+$/,''));if(title===null){e.target.value='';return}try{const data=await fileToDataURL(f);const files=await getModules();const ext=f.name.split('.').pop().toLowerCase();const type=ext==='pdf'?'PDF':['ppt','pptx'].includes(ext)?'PPT/PPTX':'FILE';files.push({title:title.trim()||f.name,name:f.name,type,date:new Date().toLocaleDateString(),data});await setModules(files);await renderModules();renderDashboard();toast('Module added successfully')}catch(err){toast('File could not be saved. Try a smaller file.')}e.target.value=''});
async function openModule(i){const m=(await getModules())[i];if(!m)return;const w=window.open();if(!w){toast('Allow pop-ups to open this file.');return}w.document.write(`<title>${esc(m.title)}</title><body style="font-family:Arial;background:#111827;color:#f5f5f5;padding:24px"><h2>${esc(m.title)}</h2><p>${esc(m.name)}</p><p><a style="color:#6ce5c2" href="${m.data}" download="${esc(m.name)}">Download file</a></p>${m.type==='PDF'?`<iframe title="${esc(m.title)}" src="${m.data}" style="width:100%;height:80vh;border:0"></iframe>`:`<p>Use Download to open this PowerPoint file in PowerPoint or a compatible app.</p>`}</body>`);w.document.close()}
async function downloadModule(i){const m=(await getModules())[i];if(!m)return;const a=document.createElement('a');a.href=m.data;a.download=m.name;a.click()}
async function deleteModule(i){if(!confirm('Delete this module file?'))return;const files=await getModules();files.splice(i,1);await setModules(files);await renderModules();renderDashboard();toast('Module deleted')}
function renderDashboardModuleCount(){getModules().then(m=>{const el=$('#moduleCount');if(el)el.textContent=m.length})}
$('#clearSaved')?.addEventListener('click',async()=>{if(!confirm('Clear saved code, experiment images, and module files from this browser?'))return;Object.keys(localStorage).filter(k=>k.startsWith('ds-code-')||k.startsWith('ds-youtube-')).forEach(k=>localStorage.removeItem(k));for(const k of await dbKeys())if(String(k).startsWith('image-')||k==='modules')await dbDelete(k);await renderModules();renderDashboardModuleCount();toast('Saved lab images, code and modules cleared')});
$('#themeToggle')?.addEventListener('change',e=>{document.body.classList.toggle('light-mode',!e.target.checked);localStorage.setItem('ds-light-mode',String(!e.target.checked))});
const photoInput=$('#photoInput');photoInput?.addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;if(!f.type.startsWith('image/'))return toast('Choose an image file.');const data=await fileToDataURL(f);localStorage.setItem('ds-profile-photo',data);renderProfilePhoto();e.target.value=''});
function renderProfilePhoto(){const data=localStorage.getItem('ds-profile-photo')||'images/profile.png';const avatarIds=['#topAvatar','#sideAvatar'];avatarIds.forEach(id=>{const el=$(id);if(el)el.innerHTML=data?`<img src="${data}" alt="Profile photo">`:'CP'});const p=$('#profileAvatar');if(p){if(data){p.src=data;p.hidden=false}else{p.removeAttribute('src');p.hidden=true}}}
$('#profileAvatar')?.addEventListener('click',()=>photoInput?.click());
function renderDashboard(){const subCount=PROGRAMS.reduce((n,p)=>n+p.subs.length,0);$('#subCount').textContent=subCount;$('#dashboardPrograms').innerHTML=PROGRAMS.map(p=>`<article class="program-card" data-open-program="${p.id}"><img class="program-thumb" src="images/experiment-${p.id}.svg" alt="${p.title} illustration"><span class="num">PROGRAM ${String(p.id).padStart(2,'0')}</span><h3>${p.title}</h3><p>${p.desc}</p><div class="chips">${p.subs.map(s=>`<span class="chip">${s[0]}</span>`).join('')}</div></article>`).join('');$$('[data-open-program]').forEach(c=>c.addEventListener('click',()=>{navigate('lab');openProgram(Number(c.dataset.openProgram))}));renderDashboardModuleCount()}
renderDashboard();renderPrograms();renderModules();renderProfilePhoto();if(localStorage.getItem('ds-light-mode')==='true'){$('#themeToggle').checked=false;document.body.classList.add('light-mode')}


// Profile editor: keeps editable student details in this browser.
const profileDefaults={name:'D. Sravani',roll:'24102A030018',course:'Data Science',professor:'S. Bosu Babu',section:'5th Semester',email:''};
function readProfile(){try{return {...profileDefaults,...JSON.parse(localStorage.getItem('ds-profile-details')||'{}')}}catch{return {...profileDefaults}}}
function renderProfileDetails(){const d=readProfile();const vals=[d.name,d.roll,d.course,d.professor,d.section,d.email];const nodes=$$('#profile .details-grid b');nodes.forEach((n,i)=>{if(vals[i]!==undefined)n.textContent=vals[i]||'Not added'});const h=$('#profile .profile-info h2');if(h)h.textContent=d.name;const muted=$('#profile .profile-info .muted');if(muted)muted.textContent=d.course+' • MBU';$$('.mini-profile b').forEach(n=>n.textContent=d.name);$$('.top-profile b').forEach(n=>n.textContent=d.name);}
const profileModal=$('#profileEditModal');
function openProfileEditor(){const d=readProfile();const form=$('#profileEditForm');Object.keys(d).forEach(k=>{if(form.elements[k])form.elements[k].value=d[k]||''});profileModal?.classList.add('show');profileModal?.setAttribute('aria-hidden','false')}
$('#editProfileBtn')?.addEventListener('click',openProfileEditor);
$('#closeProfileEdit')?.addEventListener('click',()=>{profileModal.classList.remove('show');profileModal.setAttribute('aria-hidden','true')});
$('#cancelProfileEdit')?.addEventListener('click',()=>{profileModal.classList.remove('show');profileModal.setAttribute('aria-hidden','true')});
profileModal?.addEventListener('click',e=>{if(e.target===profileModal){profileModal.classList.remove('show');profileModal.setAttribute('aria-hidden','true')}});
$('#profileEditForm')?.addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;const d={};['name','roll','course','professor','section','email'].forEach(k=>d[k]=f.elements[k].value.trim());localStorage.setItem('ds-profile-details',JSON.stringify(d));renderProfileDetails();profileModal.classList.remove('show');profileModal.setAttribute('aria-hidden','true');toast('Profile updated successfully')});
renderProfileDetails();
