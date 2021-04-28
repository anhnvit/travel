import React from 'react';

import DataGrid, { Column, Export } from 'devextreme-react/data-grid';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import styles from './style.less';
/*
  // Use this import for codeSandBox
  import FileSaver from "file-saver";
*/
import { exportDataGrid } from 'devextreme/excel_exporter';

import { countries } from './data.js';
const gdpFormat = {
    type: 'percent',
    precision: 1
};

const Template = (props) => {
    const onExporting = (e) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('test');
        exportDataGrid({
            component: e.component,
            worksheet: worksheet,
            topLeftCell: { row: 6, column: 1 },
            customizeCell: function (options) {
                if (options.gridCell.rowType !== 'header') {
                    options.height = 45;
                    if (options.excelCell.fullAddress.row % 2 === 0) {
                        options.excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D9E2F3' }, bgColor: { argb: 'D9E2F3' } };
                    }
                }
            }
        }).then(function (dataGridRange) {
            // header
            //Row 1
            const headerRow1 = worksheet.getRow(1);
            headerRow1.height = 48;
            headerRow1.getCell(1).value = 'logo';
            headerRow1.getCell(2).value = 'CÔNG TY CỔ PHẦN GIẢI PHÁP THỜI TIẾT WEATHERPLUS \r Đc: Tầng 18, tháp A,  tòa nhà Sông Đà, Nam Từ Liêm, Hà Nội \r Số điện thoại liên hệ: 0967.329.366';
            headerRow1.getCell(2).font = { name: 'Times New Roman', bold: true, size: 12, color: { argb: '2D4D6A' } };
            headerRow1.getCell(2).alignment = { wrapText: true, horizontal: 'center' };
            worksheet.mergeCells(1, 2, 1, 9);
            //Row 2
            const headerRow2 = worksheet.getRow(2);
            headerRow2.height = 35;
            worksheet.mergeCells(2, 1, 2, 9);
            headerRow2.getCell(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'A8CD90' }
            };
            headerRow2.getCell(1).value = 'DỰ BÁO THỜI TIẾT CHO CHUYẾN DU LỊCH 23123 \r (29/09/2020 - 01/10/2020)';
            headerRow2.getCell(1).font = { name: 'Times New Roman', size: 13, bold: true };
            headerRow2.getCell(1).alignment = { horizontal: 'center', wrapText: true };
            //Row 3
            worksheet.mergeCells(3, 1, 3, 9);
            // Row 4 
            const headerRow4 = worksheet.getRow(4);
            headerRow4.height = 130;
            headerRow4.getCell(1).value = 'Nhận định chung về thời tiết tour';
            headerRow4.getCell(1).font = { name: 'Times New Roman', bold: true, size: 13 };
            headerRow4.getCell(1).alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
            headerRow4.getCell(2).value = ' - Ngày xuất phát, thời tiết FPT Shop Ngã Tư Phố Nối, Quốc lộ 5, Phố Nối, tt. Bần Yên Nhân, Yên Mỹ, Hưng Yên, Việt Nam: Mang theo vật dụng che mưa và giữ ấm cơ thể khi ra ngoài. \r- Điểm đến Tuoi Tre Football Field, Thanh Nhàn, Hai Bà Trưng, Hà Nội, Việt Nam: Mang theo vật dụng che mưa và giữ ấm cơ thể khi ra ngoài. \r- Điểm đến Vũng Tàu, Bà Rịa - Vũng Tàu, Việt Nam: Ngày có lúc mưa, nên mang theo các vật dụng tránh mưa khi đi ra ngoài. Giữ ấm cơ thể vào đêm và sáng sớm đề phòng nhiệt xuống sâu. \r- Điểm đến Vinh, Nghệ An, Việt Nam: Có lúc có mưa nên chuẩn bị ô dù và áo mưa khi đi ra ngoài \r- Điểm đến Vinhomes Ocean Park, Đa Tốn, Gia Lâm, Hà Nội, Việt Nam: Mang theo vật dụng che mưa và giữ ấm cơ thể khi ra ngoài.';
            headerRow4.getCell(2).font = { name: 'Times New Roman', size: 13 };
            headerRow4.getCell(2).alignment = { wrapText: true, horizontal: 'left', vertical: 'middle' };
            worksheet.mergeCells(4, 2, 4, 9);
            // Row 5
            const headerRow5 = worksheet.getRow(5);
            headerRow4.height = 50;
            headerRow5.getCell(1).value = 'Thông tin dự báo';
            headerRow5.getCell(1).font = { name: 'Times New Roman', bold: true, size: 13 };
            headerRow5.getCell(1).alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
            headerRow5.getCell(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'F4B083' }
            };
            worksheet.mergeCells(5, 1, 5, 9);
            // footer
            const footerRowIndex = dataGridRange.to.row + 2;
            // Row footer 1
            const footerRow1 = worksheet.getRow(footerRowIndex);
            footerRow1.getCell(1).value = 'Ghi chú:';
            footerRow1.getCell(1).font = { name: 'Times New Roman', bold: true, size: 13 };

            // Row footer 2
            const footerRow2 = worksheet.getRow(footerRowIndex + 1);
            footerRow2.getCell(2).value = ' - Thông tin thời tiết mang tính dự báo, không chính xác 100%';
            footerRow2.getCell(2).font = { name: 'Times New Roman', size: 13 };

            // Row footer 3
            const footerRow3 = worksheet.getRow(footerRowIndex + 2);
            footerRow3.getCell(2).value = ' - Thông tin thời tiết về tour của Quý khách thường xuyên được cập nhật tại website http://weathertravel.vn';
            footerRow3.getCell(2).font = { name: 'Times New Roman', size: 13 };

            // Row footer 4
            const footerRow4 = worksheet.getRow(footerRowIndex + 3);
            footerRow4.getCell(2).value = ' - Nếu thông tin dự báo tại điểm du lịch của Quý khách có sự khác biệt, vui lòng liên hệ hotline: 18001195 (miễn phí) để được hỗ trợ';
            footerRow4.getCell(2).font = { name: 'Times New Roman', size: 13 };

            // Row footer 5
            const footerRow5 = worksheet.getRow(footerRowIndex + 5);
            worksheet.mergeCells(footerRowIndex + 5, 1, footerRowIndex + 5, 9);

            footerRow5.getCell(1).value = 'KÍNH CHÚC QUÝ KHÁCH CÓ MỘT CHUYẾN ĐI THÚ VỊ';
            footerRow5.getCell(1).font = { name: 'Times New Roman', size: 13 };
            footerRow5.getCell(1).alignment = { horizontal: 'right' };
        }).then(function () {
            // https://github.com/exceljs/exceljs#writing-xlsx
            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'CountriesPopulation.xlsx');
            });
        });
        e.cancel = true;
    }
    return (
        <DataGrid
            dataSource={countries}
            showBorders={true}
            onExporting={onExporting}
        >
            <Export enabled={true} />
            <Column
                dataField="Date"
                caption="Ngày"
                dataType="date"
                width={100}
            />
            <Column
                dataField="Location"
                caption="Địa điểm"
                width={250}
            />
            <Column
                // dataField="Image"
                caption="Thời tiết"
                width={150} >
                <Column
                    dataField="Image"
                    width={150} />
                <Column
                    dataField="Weather"
                    width={150} />
            </Column>
            <Column
                dataField="Temperature"
                caption="Nhiệt độ"
                width={85}
            />
            <Column
                dataField="Rain"
                caption="Khả năng mưa"
                format="percent"
                width={100}
            />
            <Column
                dataField="Humidity"
                caption="Độ ẩm"
                format="percent"
                width={85}
            />
            <Column
                dataField="Wind"
                caption="Gió"
                width={150}
            />
            <Column
                dataField="UVMax"
                caption="UV max"
                width={85}
            />
        </DataGrid>
    );
    
}

export default Template;
