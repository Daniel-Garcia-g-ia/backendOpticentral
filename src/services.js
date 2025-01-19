const ExcelJS = require('exceljs');

async function generateExcel(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Hoja1');

    // Definir encabezados
    worksheet.columns = [
        { header: 'Equipment ID', key: 'equipmentId', width: 15 },
        { header: 'Equipment Name', key: 'equipmentName', width: 25 },
        
        { header: 'Location', key: 'location', width: 20 },
        { header: 'Date Production', key: 'date', width: 15 },
        { header: 'Turn Production', key: 'turn', width: 15 },
        { header: 'Brand', key: 'brand', width: 20 },
        { header: 'Volume Production', key: 'volume', width: 20 },
        { header: 'Turn Report', key: 'turnReport', width: 15 },
        { header: 'Start Time', key: 'startTime', width: 15 },
        { header: 'End Time', key: 'endTime', width: 15 },
        { header: 'Total Time', key: 'totalTime', width: 15 },
        { header: 'Volume Report', key: 'volumeReport', width: 15 },
    ];

    // Agregar datos
    data.forEach(equipment => {
        equipment.processData.forEach(process => {
            process.production.forEach(prod => {
                prod.report.forEach(report => {
                    report.productionReportItem.forEach(item => {
                        worksheet.addRow({
                            equipmentId: equipment.equipmentId,
                            equipmentName: equipment.equipmentName,
                            location: equipment.location,
                            date: process.date,
                            turn: process.turn,
                            brand: prod.brand,
                            volume: prod.volume,
                            turnReport: item.turn,
                            startTime: item.startTime,
                            endTime: item.endTime,
                            totalTime: item.totalTime,
                            volumeReport: item.volume,
                        });
                    });
                });
            });
        });
    });

    // Guardar archivo
    const filePath = './reporte.xlsx';
    await workbook.xlsx.writeFile(filePath);
    console.log(`Archivo Excel generado: ${filePath}`);
    return filePath;
}


module.export=generateExcel