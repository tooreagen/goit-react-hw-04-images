import { Component } from "react";
import { Blocks } from 'react-loader-spinner';
import { LoaderWrapper } from "./Loader.styled";

export class Loader extends Component {
    render() {
        return (
          <LoaderWrapper>
            <Blocks
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
            />
          </LoaderWrapper>
        );
    }
}