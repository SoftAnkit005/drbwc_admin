import { Row, Col } from 'reactstrap';
// import Chat from '../../components/dashboard/minimalDashboard/Chat';
// import Messages from '../../components/dashboard/minimalDashboard/Messages';
// import RecentComments from '../../components/dashboard/minimalDashboard/RecentComments';
// import ReviewCard from '../../components/dashboard/minimalDashboard/ReviewCard';
// import Sales from '../../components/dashboard/minimalDashboard/Sales';
// import SalesDifference from '../../components/dashboard/minimalDashboard/SalesDifference';
// import SalesOverview from '../../components/dashboard/minimalDashboard/SalesOverview';
// import TodoList from '../../components/dashboard/minimalDashboard/TodoList';
// import VisitStatistics from '../../components/dashboard/minimalDashboard/VisitStatistics';
// import WeatherCard from '../../components/dashboard/minimalDashboard/WeatherCard';
// import YearlySales from '../../components/dashboard/minimalDashboard/YearlySales';
import Greetings from '../../components/dashboard/minimalDashboard/Greetings';

const Dashboard = () => {
  return (
    <>
      {/*********************Sales Overview ************************/}
      <Row>
        <Col xs="12">
            <Greetings />
        </Col>
        {/* <Col lg="8">
            <YearlySales />
        </Col>
        <Col lg="4">
            <WeatherCard />
            <ReviewCard />
        </Col>
        <Col lg="6">
          <RecentComments />
        </Col>
        <Col lg="6">
          <SalesOverview />
        </Col>
        <Col lg="8">
          <SalesDifference />
        </Col>
        <Col lg="4">
          <Sales />
          <VisitStatistics />
        </Col> */}
        
        {/* <Col lg="4" className='d-flex align-items-stretch'>
          <TodoList />
        </Col>
        <Col lg="4" className='d-flex align-items-stretch'>
          <Messages />
        </Col>
        <Col lg="4" className='d-flex align-items-stretch'>
          <Chat />
        </Col> */}
      </Row>
      
    </>
  );
};

export default Dashboard;
