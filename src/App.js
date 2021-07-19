import './App.css';
import {useState, useEffect} from 'react';

function Drugs({ drugs, caution, onClick }) {
  return (<div className={`medication__drugs borders-dark ${caution ? 'caution-light' : 'go-light '}`} onClick={()=>onClick()}>
    {caution}
    <p className='bold'>{drugs[0].Generic.join(', ')}</p>
    <p>({drugs[0].Trade.join(', ')})</p>
  </div>);
}

function GeneInfo({ geneInfo, caution }) {
  return (<>
    <div className='bold'>{geneInfo.Gene}</div>
    <div className='bold'>{geneInfo.Genotype}</div>
    <div className={`${caution ? 'caution-light' : 'go-light'}`}>{geneInfo.Phenotype}</div>
  </>);
}

function GeneInfos({ geneInfos, caution }) {
  return (<>
    <div className='bold container__genes-title'>Genotype</div>
    <div className='bold container__genes-title'>Phenotype</div>
    <div className={`bold container__genes-title ${caution ? 'caution-light' : 'go-light'}`}>Phenotypes/Patient Impact</div>
    {geneInfos.map((geneInfo, index) => <GeneInfo key={index} geneInfo={geneInfo} caution={caution}/>)}
  </>);
}

function Action({ description, caution }) {
  return (<div className={`container__genes_action ${caution ? 'caution-dark' : 'go-dark'}`}>
    <p>{description}</p>
  </div>);
}

function GroupPhenotype({ groupPhenotype, caution }) {
  return (<div className={`${caution ? 'caution-dark' : 'go-dark'}`}>
    {groupPhenotype}
  </div>);
}

function CurrentMedication({medication}) {
  
  const caution = medication.Action.indexOf('CAUTION') > -1;

  const [visible, setVisible] = useState(false);

  return (<div className="medication">
    <span className="medication__TheraputicArea">{medication.TheraputicArea.join(', ')}</span>
    <div className="container">
      <Drugs drugs={medication.Drugs} caution={caution} onClick={() => {setVisible(!visible)}}/>
      {visible && <div className="container__genes borders-dark">
        <GeneInfos geneInfos={medication.GeneInfo} caution={caution} />
        <Action description={medication.Action.join(', ')} caution={caution} />
        <GroupPhenotype groupPhenotype={medication.GroupPhenotype} caution={caution} />
      </div>}
      {visible && <div className="container__recommendation borders-dark"><p>{medication.Recommendation}</p></div>}
    </div>
  </div>);
}

function CurrentMedications({ medications }) {
  return (<>
    {medications.map((medication, index) => 
      <CurrentMedication
        key={index}
        medication={medication} />
    )}
  </>);
}


function Sample() {
  
  const [sample, setSample] = useState(null);

   const loadFile =  async() => {
    
     const response = await fetch('./FakeSample.json');
    
     const sampleJson = await response.json();
    
     setSample({ CurrentMedications: sampleJson.CurrentMedications });
   }

  useEffect(() => {
    loadFile();
  }, []);
  
  return (<>
    {sample ? <CurrentMedications medications={sample.CurrentMedications} /> : <p>Cargando...</p> }
  </>);
 }

function App() {
 
  return (
    <div>
      <Sample />
    </div>
  );
}

export default App;
