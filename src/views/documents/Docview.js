import { APILINK } from "src/EndPoint";
import { create_axios_instance } from "../../actions/axiosActions"
import { LogOut } from "src/actions/authAction";
import React, { useState, useEffect } from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CRow, CCol, CForm } from "@coreui/react";
import { CModal, CModalTitle, CModalHeader, CModalBody, CFormInput } from "@coreui/react";

const axiosApiInstance = create_axios_instance()


const ViewDepartments = () => {
  const [docs, setdocs] = useState([])
  const [title, settitle] = useState("")
  const [file, setfile] = useState("")
  const [visible, setvisible] = useState(false)
  const getDocs = async () => {
    await axiosApiInstance.get(APILINK + "/Document/").then((res) => {
      if (res.data) {
        console.log(res.data)
        setdocs(res.data)
      }
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 403) {
        LogOut()
      }
      else {
        console.log(err)
      }
    });
  }

  const addDocs = async () => {
    let formData = new FormData()
    formData.append("title", title)
    formData.append("file", file)
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    await axiosApiInstance.post(APILINK + "/Document/", formData, config).then((res) => {
      if (res.data) {
        settitle("")
        setfile("")
        getDocs()
        setvisible(false)
      }
    }).catch((err) => {
      console.log(err)
      if (err.response) {
        console.log(err);
      }
    });

  }

  useEffect(() => {
    getDocs()
  }, [])


  const documents = docs.map((val, index) => {
    return (
      <CTableRow >
        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
        <CTableDataCell className="text-capitalize"><a href={APILINK + val.file}>{val.title}</a></CTableDataCell>
      </CTableRow>
    )

  })

  return (
    <>
      <CRow className="justify-content-end">
        <CCol sm="auto">
          <CButton onClick={() => setvisible(true)}>Add Document +</CButton>
        </CCol>
      </CRow>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">File</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody >
          {documents}
        </CTableBody>
      </CTable>

      <CModal visible={visible} onClose={() => setvisible(false)}>
        <CModalHeader>
          <CModalTitle>Document</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={() => addDocs()}>
            <CFormInput value={title} className="mb-4" type="text" placeholder="Document Name" onChange={(e) => settitle(e.target.value)} />
            <CFormInput className="mb-4" type="file" onChange={(e) => setfile(e.target.files[0])} />
            <CButton type="submit" color="primary">Create Document</CButton>
          </CForm>

        </CModalBody>

      </CModal>
    </>
  )
}

export default ViewDepartments
