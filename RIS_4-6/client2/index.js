const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./context')(Sequelize, config);
const server = require('./server')(db, config);

async function clientSim(id)
{
    db.model.create({id: id, data: (Date.now()+7200000), clNum: 2})
}

(async function() {
    await db.sequelize.sync();
    setInterval(async () =>
    {
        db.model.count().then((count)=>{
            if(count >= 10)
            {
                server.logger.debug('trancate db');
                db.model.destroy({where: {}, truncate: true})
            }
            else
            {
                for(i=count;i<10;i++)
                {
                    server.logger.debug('create entity');
                    clientSim(i + 1);
                }
            }
        });
    }, 20000);
    server.listen(8003, () => console.log('Server is running'));
})();
