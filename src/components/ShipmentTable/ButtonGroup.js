import React from 'react'
import Button from '@material-ui/core/Button';
import styled from 'styled-components'


const ButtonContainer = styled.div`
margin-top: 20px;
text-align: center;
.previous {
  margin-right: 20px;
}
`
export default ({ page, setPage, pageLength, ...props }) => (
    <ButtonContainer className="button-container">
        <Button
            className="page-button previous"
            disabled={page === 0 || pageLength === 0}
            onClick={() => setPage(page - 1)}
            variant="contained"
            color="primary"
        >
            Previous Page
    </Button>
        <Button
            className="page-button next"
            disabled={page === pageLength - 1 || pageLength === 0}
            onClick={() => setPage(page + 1)}
            variant="contained"
            color="primary"
        >
            Next Page
    </Button>
    </ButtonContainer>
)