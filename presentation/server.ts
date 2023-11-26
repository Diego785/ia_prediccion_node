


// const fsLogRepository = new LogRepositoryImpl(
//   new FileSystemDatasource(),
// );
// const mongoLogRepository = new LogRepositoryImpl(
//   new MongoLogDatasource(),
// );
// const postgresLogRepository = new LogRepositoryImpl(
//   new PostgresLogDatasource(),
// );


// const emailService = new EmailService();


export class Server {

  public static async start() {

//     console.log( 'Server started...' );

//     //todo: Mandar email
//     // new SendEmailLogs(
//     //   emailService, 
//     //   fileSystemLogRepository,
//     // ).execute(
//     //   ['fernando.herrera85@gmail.com','fernando.herrera.cr@gmail.com']
//     // )
//     // emailService.sendEmailWithFileSystemLogs(
//     //   ['fernando.herrera85@gmail.com','fernando.herrera.cr@gmail.com']
//     // );
    
//     // const logs = await logRepository.getLogs(LogSeverityLevel.low);
//     // console.log(logs);

//     // CronService.createJob(
//     //   '*/5 * * * * *',
//     //   () => {
//     //     const url = 'https://google.com';

//     //     new CheckServiceMultiple(
//     //       [ fsLogRepository, postgresLogRepository, mongoLogRepository ],
//     //       () => console.log( `${ url } is ok` ),
//     //       ( error ) => console.log( error ),
//     //     ).execute( url );
        
//     //   }
//     // );


  }


}

