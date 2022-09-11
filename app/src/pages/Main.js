import React from 'react';
import { Link } from 'react-router-dom';

const Main = (props) => {
	return (
		<>
			<h3>메인페이지</h3>
			<ul>
                <Link to="/join"><li>회원가입</li></Link>
				<Link to="/login"><li>로그인</li></Link>
			</ul>
		</>
	);
};

export default Main;
