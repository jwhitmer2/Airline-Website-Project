var mysql   = require('mysql');


/* DATABASE CONFIGURATION */
var connection = mysql.createConnection({
    host: 'cwolf.cs.sonoma.edu',
    user: 'jwhitmer',
    password: '003973169'


});

var dbToUse = 'jwhitmer';

//use the database for any queries run
var useDatabaseQry = 'USE ' + dbToUse;

//create the Flight table if it does not exist
connection.query(useDatabaseQry, function (err) {
    if (err) throw err;

    var createTableQry = 'CREATE TABLE IF NOT EXISTS Flight('
        + 'FlightNo INT AUTO_INCREMENT PRIMARY KEY'
        + ',Departure VARCHAR(3)'
        + ',Arrival VARCHAR(3)'
        + ',PlaneID VARCHAR(6)'
	+ ',Passengers INT'
	+ ')';
    connection.query(createTableQry, function (err) {
        if (err) throw err;
    });
});

exports.SearchFlight = function(flightInfo, callback) {
	console.log('Using this info: ');
	console.log(flightInfo);
	var query = 'SELECT F.FlightNo, F.Departure, F.Arrival FROM Flight F JOIN Airplane A ON F.PlaneID = A.PlaneID WHERE F.Departure = ' + '\'' + flightInfo.departure + '\'' + '\'' + 'AND F.Arrival = ' + '\'' + flightInfo.arrival + '\'' + 'AND F.Passengers < A.MaxPassengers;';
	console.log(query);
	connection.query(query, 
		function (err, result) {
			if (err) {
				console.log(err);
				callback(true);
				return
			}
			callback(false, result);
		}
	);
}

exports.GetUnbookedView = function(callback) {
	connection.query('SELECT * FROM UnbookedFlights;',
		function (err, result) {
			if (err) {
				console.log(err);
				callback(true);
				return
			}
			callback(false, result);
		}
	);
}


exports.GetPlanes = function(callback) {
	connection.query('SELECT * FROM Airplane',
		function (err, result) {
			if (err) {
				console.log(err);
				callback(true);
				return;
			}
			callback(false, result);
		}
	);
}

exports.PlaneByID = function(planeInfo, callback) {
	var query = 'SELECT * FROM Airplane WHERE PlaneID=' + planeInfo.PlaneID + ';';
	console.log(query);
	connection.query(query,
		function (err, result) {
			if (err) {
				console.log(err);
				callback(true);
				return;
			}
			callback(false, result);
		}
	);
}

exports.LocationView = function(callback) {
	connection.query('SELECT * FROM LocationsServiced',
		function (err, result) {
			if (err) {
				console.log(err);
				callback(true);
				return
			}
			callback(false, result);
		}
	);
}

exports.InsertPassenger = function(userInfo, callback) {
	console.log(userInfo);
	var query = 'INSERT INTO Passenger (Fname, MI, LName, Start, FinalDest) VALUES (\'' + userInfo.fname + '\', \'' + userInfo.mi + '\', \'' + userInfo.lname + '\', \'' + userInfo.start + '\', \'' + userInfo.finaldest + '\');';
	console.log(query);
	connection.query(query, 
		function (err, result) {
			if (err) {
				console.log(err);
				callback(true);
				return
			}
			callback(false, result);
		}
	);
}


exports.SelectFlights = function(locInfo, callback) {
	console.log(locInfo);
	var query = 'SELECT FlightNo, Departure, Arrival FROM Flight WHERE Departure = \'' + locInfo + '\'';
	console.log(query);
	connection.query(query,
		function (err, result) {
			if (err) {
				console.log(err);
				callback(true);
				return
			}
			callback(false, result);
		}
	);
}
exports.GetAllPassengers = function(callback) {
	connection.query(' SELECT * FROM Passenger', 
		function (err, result) {
			if (err) {
				console.log(err);
				callback(true);
				return
			}
			callback(false, result);
		}
	);
}

exports.SelectPassenger = function(passInfo, callback) {
	var query = 'SELECT * FROM Passenger WHERE P_ID = ' + passInfo;
	console.log(query);
	connection.query(query,
		function (err, result) {
			if (err) {
				console.log(err);
				callback(true);
				return
			}
			callback(false, result);
		}
	);
}

exports.UpdatePassenger = function(updates, callback) {
	console.log(updates);
	var query = 'UPDATE Passenger SET Fname = \'' + updates.fname + '\', MI = \'' + updates.mi + '\', LName = \'' + updates.lname + '\', Start = \'' + updates.start + '\', FinalDest = \'' + updates.finaldest + '\' WHERE P_ID = ' + updates.P_ID + ';';
	console.log(query);
	connection.query(query,
		function (err, result) {
			if (err) {
				console.log(err);
				callback(true);
				return
			}
			callback(false, result);
		}
	);
}

exports.BookFlight = function(passInfo, callback) {
	var query = 'INSERT INTO FlightLeg VALUES (' + passInfo.P_ID + ', ' + passInfo.FlightNo + ', \'' + passInfo.Seat + '\');';
	console.log(query);
	connection.query(query,
		function (err, result) {
			if (err) {
				console.log(err);
				callback(true);
				return
			}
			callback(false, result);
		}
	);
}	
