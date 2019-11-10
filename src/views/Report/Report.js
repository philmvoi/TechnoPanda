import React, { Component } from 'react';
import {Col, Card, CardLink, CardBody, CardSubtitle, CardHeader, CardImg, CardImgOverlay, CardGroup} from 'reactstrap';
 
export default class Reports extends Component {
 
     render() {
       return (
         <div>
           <Card body style={{ backgroundColor: '#dcdcdc', borderColor: 'dcdcdc'}}>
           <CardGroup>
             <Col >
               <Card className="card text-center" >
                 <CardHeader className="text-center">Report Links</CardHeader>
                 <CardBody>
                   <CardSubtitle>
                     <CardLink href="/#/reports/popmeals">Popular Meals Report</CardLink>
                   </CardSubtitle>
                   <br />
                   <CardSubtitle>
                     <CardLink href="/#/reports/poppkgs">Popular Packages Report</CardLink>
                   </CardSubtitle>
                   <br />
                   <CardSubtitle>
                     <CardLink href="/#/reports/popingrts">Popular Ingredients Report</CardLink>
                   </CardSubtitle>
                   <br />
                   <CardSubtitle>
                     <CardLink href="/#/reports/upcoming">Upcoming Orders Report</CardLink>
                   </CardSubtitle>
                   <br />
                   <CardSubtitle>
                     <CardLink href="/#/reports/loyalcusts">Loyal Customers Report</CardLink>
                   </CardSubtitle>
                   <br />
                   <CardSubtitle>
                     <CardLink href="/#/reports/revenue">Revenue Report</CardLink>
                   </CardSubtitle>
                 </CardBody>
               </Card>
             </Col>

           </CardGroup>
           </Card>

         </div>
          
       )
     }
  
}

   