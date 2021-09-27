import React from 'react';
import Header from '../Header'
import Content from '../Content'
import Content2 from '../Content2'
import Map from '../Map'
import Highlight from '../Highlight'
import Zugangsdichte from '../charts/Zugangsdichte'
import MobilNutzung from '../charts/Mobilnutzung'
import NutzungsGründe from '../charts/Nutzungsgründe'
import IktBeschäftigung from '../charts/IKTBeschäftigung'
import HighInternetnutzung from '../charts/HighlightInternet'
import '../../styles/content.css';

export default function Gesellschaft() {

    return(
    <div className="Wrap1">
        <div className="placeholder1"></div>
        <div className="placeholder2"></div>
        <div className="placeholder3"></div>

        <Highlight
        überschrifth3=" "
        überschrift="Gründe, warum kein Internetzugang besteht" 
                 //  text="Im Jahr 2019 gaben 46% der Haushalte, die keinen Zugang zum Internet haben, an, das Internet nicht als nützlich anzusehen. Der zweite Hauptgrund ist, dass den betroffenen Personen die erforderlichen Kenntnisse fehlten (44%)."
                   hichart1={
                    < HighInternetnutzung/>
                         }
                   >
       
        </Highlight>
        
        <Header überschrift1="Digitale Wirtschaft" 
                überschrift2="und Gesellschaft"
                boldText="Für viele Menschen in der EU ist die Nutzung des Internets zu einem wichtigen Teil ihres täglichen Lebens geworden."
                normalText="Heutzutage verbringen Menschen einen erheblichen Teil ihrer Zeit aus verschiedenen Gründen online, sei es bei der Arbeit, in der Schule, zu Hause oder unterwegs. Diese digitale Zusammenfassung bietet leicht verständliche Statistiken zu verschiedenen digitalen Themen und präsentiert sie anhand von interaktiven Datenvisualisierungen. "
                
                mapchart={
                <Map></Map>
                }
        ></Header>
        <Content überschrift="Haushalte - Internetzugangsdichte"
                 text="Die Internet- und Kommunikationstechnik für die breite Öffentlichkeit hat sich in den letzten Jahren erheblich verbessert. In allen EU-Mitgliedstaaten sind Breitbandnetze die am stärksten verbreitete Form des Internetzugangs. Island, Norwegen und die Niederlande hatten mit 98% im Jahr 2019 den höchsten Anteil an Internetzugängen, während Bulgarien mit 75% die niedrigsten Quoten besaß. "
                 highlightNumber="79%"
                 erklärungsText="der Personen zwischen 16 und 74 Jahren in der EU gaben an, das Internet häufig (durchschnittlich jeden Tag oder fast jeden Tag) zu benutzen."
        ></Content>
        <Content2 chart={
            <Zugangsdichte infoBoxAlle="Bulgarien, Rumänien, Zypern, Griechenland, Portugal und Kroatien verzeichneten einen starken Anstieg der Internetzugangsdichte. Die Haushalte mit Internetzugang stiegen in Bulgarien in den letzten 10 Jahren beispielsweise um 42 Prozentpunkte. Die Niederlande verzeichneten 2019 mit 98% den höchsten Anteil an Breitbandzugängen. In Rumänien wurde ein Anstieg der Haushalte mit Breitbandzugang in den letzten 9 Jahren um 59 Prozentpunkte registriert. 2010 waren es 23% der Haushalte."
                            numberAlle="90%"
                            numberAlleText="der Haushalte in der Europäischen Union haben Zugang zum Internet. 2010 waren es noch 70%"
                            numberBB="89%"
                            numberBBText="der Haushalte haben einen Breitbandzugang. Dies entspricht einer Erhöhung um 25 Prozentpunkten."
                           
            ></Zugangsdichte>
                           
        } chart2={
            <MobilNutzung headline="Mobilnutzung"
                          mobilText="Die Möglichkeiten zur Nutzung des Internets sind vielvältig. 
                          Die mobile Internetnutzung bezeichnet die Nutzung des Internets an anderen Orten als zu Hause oder 
                          am Arbeitsplatz, zum Beispiel auf tragbaren Computern oder mobilen Geräten über mobile oder drahtlose 
                          Verbindungen."
                          mobilText2="In der Europäischen Union stieg die Anteil von Personen, die angaben das Internet unterwegs zu nutzen, um 39 Prozentpunkte an. 
                          2012 betrug der Anteil 36%, während es 2019 75% waren. Unterschiede zeigen sich besonders in den Altersklassen. 2012 nutzten 63% der Personen im Alter von 16 bis 24 Jahren eine mobile Internetverbindung. Im Jahr 2019 waren es bereits 95%." 
                         
                          
                          mobilText3= "Personen in der Altersgruppe 55 - 74 Jahre nutzten mobile Internetzugänge 2012 nur zu 14% und 2019 zu 52%, wobei die Zunahme der Nutzung in beiden Altersgruppen um ähnlich viele Prozentpunkte stieg. Im Vereinigten Königreich gaben 2019 100% der Personen im Alter zwischen 16 bis 24 Jahren an, über mobile Geräte das Internet zu benutzen."
                          mobilText4="Die Nutzung von mobilem Internet hängt außerdem vom Grad der Bildung ab. Personen, mit niedriger formaler Bildung nutzen diese Art des Internetzugangs weniger als es bei Personen mit hoher, formaler Bildung der Fall ist.
                          Generell benutzen Frauen weniger mobile Internetvebindungen als Männer. In Dänemark liegt der Anteil von Frauen und Männern jedoch gleichauf bei 92% für 2019."
            ></MobilNutzung>
                 } chart3={
            <NutzungsGründe headLine="Nutzungsgründe"
                            nutzText1="Die Aufschlüsselung der Online-Aktivitäten nach ihrer Häufigkeit zeigt eine Veränderung der Nutzungsgründe in den letzten 13 Jahren. Befragt wurden Personen im Alter von 16 und 74 Jahren nach ihren Online-Aktivitäten in den letzten drei Monaten vor der Erhebung der Daten. "
                            nutzText2="Eine der häufigsten Online-Aktivitäten in der Europäischen Union war 2019 die Nutzung von sozialen Netzwerken. Mehr als die Hälfte (57%) der befragten Personen 
                            nutzte Websites wie zum Beispiel Facebook, Instagram oder Twitter. In Island lag der Anteil sogar bei 92% für 2019, während in Deutschland nur 53% der Personen Soziale Netzwerke nutzen.
                            Auch das Senden von E-Mails ist eine der häufigsten Aktivitäten."
                            nutzText3=" So nutzen 75% der Personen das Internet dafür, während es im Jahr 2007 noch 48% waren."
            />
                 } chart4 ={
            <IktBeschäftigung headLine="IKT Beschäftigung"
                              iktText1="Informations- und Kommunikationstechnologien sind für Unternehmen in den letzten Jahren immer wichtiger geworden. Die Nutzung von IKT für ihren täglichen Betrieb erfordert häufig die Entwicklung und Wartung von IKT-Systemen durch Spezialisten. "  
                              iktText2=" Im Jahr 2018 waren 83,5% der IKT-Spezialisten Männer, deren Anteil verglichen mit 2010 (78,3%) anstieg. In allen EU-Ländern waren weibliche IKT-Spezialisten unterrepräsentiert.
                              Die größten geschlechtsspezifischen Unterschiede sind in Tschechien (Männer 90,1%) und Ungarn (Männer 91,5%) zu verzeichnen. Den größten Anteil an weiblichen IKT-Spezialisten wurden in Bulgarien (28,3%) und in Litauen (25,4%) registriert."
                              iktText3="Im Jahr 2019 beschäftigte rund ein Fünftel der Unternehmen (20%) in der EU IKT-Spezialisten. Dieser Anteil ist seit 2012 ungefähr gleich groß. Dänemark (30%) und Irland (32%) beschäftigten 2019 am meisten IKT-Spezialisten.
                              9% der Unternehmen in der EU gaben an, IKT-Spezialisten eingestellt oder versucht zu haben, diese einzustellen. Dieser Anteil war am größten in Belgien, Dänemark und Luxemburg mit 14%.">
                </IktBeschäftigung>
                }
        >
        </Content2>
    
        </div>


);
    }